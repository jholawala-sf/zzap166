import React, { useState, useEffect } from "react";
import { CONFIG, CLIENT_SETTINGS } from "./config";
import { Button, Modal } from "@salesforce/design-system-react";
import {
    QueryClientProvider,
    useMutation,
    QueryClient,
} from "@tanstack/react-query";
import { api, waitForJob } from "qlabs/api/ocapi";
import Instructions from "./instructions.jsx";

const queryClient = new QueryClient();

const useCountdown = (seconds, enabled = true) => {
    const [countDown, setCountDown] = useState(seconds);
    const [reset, setReset] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        var interval;
        if (enabled) {
            if (intervalId) {
                clearInterval(intervalId);
            }
            interval = setInterval(() => {
                setCountDown((current) => current - 1);
            }, 1000);
            setIntervalId(interval);
        }
        return () => clearInterval(interval);
    }, [seconds, reset, enabled]);

    useEffect(() => {
        if (countDown <= 0) {
            console.log("Countdown finished");
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [countDown]);

    const resetFunc = () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (countDown > 0) {
            setCountDown(seconds);
            setReset((current) => current + 1);
        }
    };
    return [countDown, resetFunc];
};

function Intro({ onStart }) {
    return (
        <div className="App">
            <div className="intro">
                <video playsInline autoPlay muted loop>
                    <source
                        src={`${CLIENT_SETTINGS.staticAssets}/images/Bonfire-PDP.mp4`}
                        type="video/webm"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="opacity-layer"></div>
                <div className="body-container">
                    <h1>
                        COMPOSE COMMERCE
                        <br />
                        USING GENERATIVE AI
                    </h1>
                    <h2>Create 🔥 experiences.</h2>
                    <button onClick={onStart} className="button-start">
                        Try it out
                    </button>
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/logo.png`}
                        alt="logo"
                    />
                </div>
            </div>
        </div>
    );
}

function Outro({ restart }) {
    const [countDown, reset] = useCountdown(30);
    React.useEffect(() => {
        window.removeEventListener("mousemove", reset);
        if (countDown !== 0) {
            window.addEventListener("mousemove", reset);
        }

        if (countDown === 0) {
            window.location.reload();
        }
        return () => {
            window.removeEventListener("mousemove", reset);
        };
    }, [countDown]);
    return (
        <div className="App">
            <div className="outro">
                <div className="outro-background"></div>
                <div className="opacity-layer"></div>
                <div className="body">
                    <h2>
                        LEARN MORE ABOUT
                        <br />
                        AI FOR COMMERCE
                    </h2>
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/qrcode.png`}
                        alt="qrcode"
                    />
                </div>
                <button className="restart" onClick={restart}>
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/restart-icon.png`}
                        alt="restart"
                    ></img>
                    <span>RESTART</span>
                </button>
            </div>
        </div>
    );
}

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Demo />
        </QueryClientProvider>
    );
}

function Demo() {
    const sidebarRef = React.useRef(null);
    const mainRef = React.useRef(null);
    const [showIntro, setShowIntro] = useState(true);
    const [showOutro, setShowOutro] = useState(false);
    const [countDown, reset] = useCountdown(
        CONFIG.idleTimeout / 1000,
        !(showIntro || showOutro),
    );
    const [_resetCompleted, setResetCompleted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    const reloadSidebar = () => {
        sidebarRef.current.contentWindow.location = CONFIG.sidebarPage;
    };
    const reloadMain = () => {
        mainRef.current.contentWindow.location = CONFIG.mainPage;
    };

    const resetDemoMutation = useMutation({
        mutationFn: async () => {
            const resp = await api.post("jobs/DemoReset/executions", {});
            var jobId = resp.data.id;
            await waitForJob("DemoReset", jobId);
        },
        onSuccess: () => {
            console.log("Demo Reset completed");
            setResetCompleted(true);
            setTimeout(() => {
                setFinished(false);
                setShowOutro(true);
            }, 1500);
        },
    });

    React.useEffect(() => {
        window.removeEventListener("mousemove", reset);
        if (countDown !== 0 || showIntro || showOutro) {
            window.addEventListener("mousemove", reset);
        }

        if (countDown === 0 && !showIntro) {
            // do demo reset
            console.log("Resetting demo");
            resetDemoMutation.mutate();
        }
        return () => {
            window.removeEventListener("mousemove", reset);
        };
    }, [countDown, showIntro, showOutro]);

    const finish = () => {
        setFinished(true);
        resetDemoMutation.mutate();
    };

    const start = () => {
        reset();
        setShowIntro(false);
        setFinished(false);
        setShowOutro(false);
    };

    if (showIntro) {
        return <Intro onStart={() => start()} />;
    } else if (showOutro) {
        return (
            <Outro
                restart={() => {
                    window.location.reload();
                }}
            />
        );
    }

    return (
        <div className="App">
            {showInstructions && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => setShowInstructions(false)}
                    prompt="info"
                    size="small"
                >
                    <Instructions />
                </Modal>
            )}
            {(countDown < 10 || finished) && (
                <Modal
                    disableClose
                    footer={[
                        countDown > 0 && !finished && (
                            <Button
                                key="promptBtn"
                                label="Cancel Reset"
                                onClick={() => reset()}
                            />
                        ),
                    ].filter(Boolean)}
                    isOpen={true}
                    onRequestClose={() => reset()}
                    prompt="info"
                    size="small"
                    ariaHideApp={false}
                >
                    <div className="slds-m-around_medium">
                        {countDown > 0 && !finished && (
                            <span>
                                Resetting in {countDown} seconds. Move mouse to
                                cancel.
                            </span>
                        )}
                        {(countDown <= 0 || finished) && (
                            <>
                                <div>
                                    Congrats on using prompts to build a page!
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
            )}
            <div className="main-container">
                <div className="main">
                    <div className="iframe1">
                        <h2>Page Designer</h2>

                        <iframe ref={mainRef} src={CONFIG.mainPage}></iframe>
                    </div>
                    <div className="iframe2">
                        <h2>Storefront Preview</h2>

                        <div className="iphonebezel-container">
                            <img
                                src={`${CLIENT_SETTINGS.staticAssets}/images/iphonebezel.png`}
                                alt=""
                            />
                            <iframe
                                ref={sidebarRef}
                                src={CONFIG.sidebarPage}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel-container">
                <div className="panel">
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/logo.png`}
                        alt="logo"
                    />

                    <button onClick={() => setShowInstructions(true)}>
                        Need Help?
                    </button>
                    <button onClick={reloadMain}>Choose Prompt</button>
                    <button onClick={reloadSidebar}>Refresh Storefront</button>
                    <button onClick={finish}>Finish</button>
                    <span></span>

                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/demo.png`}
                        alt="logo"
                        className="demo-img"
                    />
                </div>
            </div>
        </div>
    );
}
