const processRecommendations = async (response, element) => {
    const { recommender, loadurl } = element.dataset;
    const recommendedProducts = response[recommender].recs;

    if (recommendedProducts && recommendedProducts.length > 0) {
        const recommendations = recommendedProducts.map(({ id }) => {
            return {
                pid: id,
                swatches: true,
                ratings: true,
                showQuickView: false
            };
        });

        const url = new URL(loadurl)
        url.searchParams.append('recommendations', JSON.stringify(recommendations));

        const fetchResponse = await fetch(url.href);
        const content = await fetchResponse.text();

        const carousel = element.querySelector('.einstein-carousel');
        carousel.innerHTML = content;

        $(carousel).slick();

        if (window.dw && dw.ac) {
            recommendedProducts.forEach(product => {
                dw.ac.capture({ id: product.id, type: dw.ac.EV_PRD_RECOMMENDATION });
            });
        }
    }
};

module.exports = () => {
    if (!window.CQuotient) return;

    const EinsteinUtils = window.CQuotient;

    const carousels = document.querySelectorAll('.einstein-carousel-global, .einstein-carousel-category, .einstein-carousel-product');
    carousels.forEach(carousel => {
        const { recommender } = carousel.dataset;
        const anchor = carousel.getAttribute('data-anchor');

        var params = {
            userId: EinsteinUtils.getCQUserId(),
            cookieId: EinsteinUtils.getCQCookieId(),
            ccver: '1.01'
        };

        if (anchor) {
            params.anchors = JSON.parse(anchor);
        }

        if (EinsteinUtils.getRecs) {
            EinsteinUtils.getRecs(EinsteinUtils.clientId, recommender, params, (response) => {
                processRecommendations(response, carousel);
            });
        } else {
            EinsteinUtils.widgets = EinsteinUtils.widgets || [];
            EinsteinUtils.widgets.push({
                recommenderName: recommender,
                parameters: params,
                callback: (response) => processRecommendations(response, carousel)
            });
        }
    });
};
