import React from "react";
import { Card, Icon } from "@salesforce/design-system-react";
import { Link } from "react-router-dom";
import DefaultLayout from "../layouts/default.jsx";
import { APP_SETTINGS } from "../config";
import AstroIcon from "@companion/components/icons/astro";

export default function Landing() {
    return (
        <DefaultLayout>
            <div className="slds-grid slds-gutters slds-wrap">
                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="prompt"
                                size="small"
                            />
                        }
                        heading={<Link to="prompts">Prompt Studio</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Manage prompts used in AI features
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="live_chat"
                                size="small"
                            />
                        }
                        heading={<Link to="assistant">Merchant Assistant</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            AI Merchant Assistant
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="catalog"
                                size="small"
                            />
                        }
                        heading={<Link to="catalogs">Catalog Projects</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Manage Catalog projects
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="code_playground"
                                size="small"
                            />
                        }
                        heading={<Link to="developer">Developer Setup</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Local development helpers
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <AstroIcon
                                style={{ color: "#0176D3", width: "1.5rem" }}
                            />
                        }
                        heading={<Link to="agents">Agent Deployments</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Agent messaging deployments
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="choice"
                                size="small"
                            />
                        }
                        heading={<Link to="features">Features</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Manage custom features
                        </div>
                    </Card>
                </div>

                <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        icon={
                            <Icon
                                category="standard"
                                name="custom"
                                size="small"
                            />
                        }
                        heading={<Link to="tools">Demo Tools</Link>}
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            Configuration for demo tools, BM keepalive, etc
                        </div>
                    </Card>
                </div>

                {APP_SETTINGS.ENABLE_TESTING && (
                    <div className="slds-col slds-size_4-of-12 slds-m-vertical_small">
                        <Card
                            className="slds-card_boundary"
                            icon={
                                <Icon
                                    category="standard"
                                    name="code_playground"
                                    size="small"
                                />
                            }
                            heading={<Link to="testing">Testing</Link>}
                        >
                            <div className="slds-card__body slds-card__body_inner">
                                Extension Testing
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "",
        element: <Landing />,
        handle: {
            crumb: "Q-Labs Home",
        },
    },
];
