var IAAH = IAAH || {};

/**
* Templates
*/

IAAH.templates = {
    logo: '' +
        '<div id="logo-container">' +
            '<h1 id="logo"><a href="/"></a></h1>' +
        '</div>',
    primaryNav: '' +
        '<div id="primary-nav">' +
            '<div class="page_link" id="iaah-button">' +
                '<a href="/" name="iaah">IAAH</a>' +
            '</div>' +
            '<div class="divider"></div>' +
            '<div class="page_link" id="work-button">' +
                '<a href="/" name="work">WORK</a>' +
            '</div>' +
            '<div class="page_link" id="blog-button">' +
                '<a href="https://blog.iamalwayshungry.com" name="blog">BLOG</a>' +
            '</div>' +
        '</div>',
    secondaryNav: '' +
        '<div id="secondary-nav"></div>',
    introPanelButton: '' +
        '<div id="intropanel-button"><a href="">40 DAYS / 40 PROJECTS</a></div>',
    introPanelSmallMessage: '' +
        '<div class="small-message">' +
            '<div class="copy">' +
                '<span class="highlight">This is part of 40 days / 40 projects. </span><span class="readmore action">Read more.</span>' +
            '</div>' +
        '</div>',
    introPanelLargeMessage: '' +
        '<div class="large-message">' +
            '<div class="copy">' +
                '<img nopin="nopin" src="https://payload47.cargocollective.com/1/0/833/3258214/intropanel-headline.png" width="670" height="63" alt="40 Days / 40 Projects" />' +
                '<p>It\'s been well over two and a half years since we last updated. The heat has risen. Governments have been overthrown. ' +
                'Babies born. A lot happens, including the creation of new work. Within the pages and many clicks on this site, you will find a bulk of new projects. ' +
                'To ease the process of discovery, we thought we\'d roll it out slowly.</p><p>We are releasing forty projects over 40 days. <span class="highlight">Follow along.</span></p>' +
            '</div>' +
        '</div>',
    introPanelCloseButton: '' +
        '<div class="close-button"></div>',
    // socialComponent: '' +
    //     '<div class="social-outer">' +
    //         '<div class="social-inner">' +
    //             '<div class="social-icons">' +
    //                 '{{#if isTouchDevice}}<a href="{{twitterURL}}" target="_blank">{{/if}}' +
    //                     '<div class="social-icon twitter {{iconsColor}}">' +
    //                         // '<img src="https://www.iamalwayshungry.com/VERS8/svg/twitter-icon-white.svg" width="28" height="25" />' +
    //                     '</div>' +
    //                 '{{#if isTouchDevice}}</a>{{/if}}' +
    //                 '{{#if isTouchDevice}}<a href="{{facebookURL}}" target="_blank">{{/if}}' +
    //                     '<div class="social-icon facebook {{iconsColor}}">' +
    //                             // '<img src="https://payload47.cargocollective.com/1/0/833/3258214/facebook-icon-{{iconsColor}}.png" width="10" height="25" />' +
    //                     '</div>' +
    //                 '{{#if isTouchDevice}}</a>{{/if}}' +
    //                 '{{#if isTouchDevice}}<a href="{{pinterestURL}}" target="_blank">{{/if}}' +
    //                     '<div class="social-icon pinterest {{iconsColor}}">' +
    //                             // '<img src="https://payload47.cargocollective.com/1/0/833/3258214/pinterest-icon-{{iconsColor}}.png" width="15" height="25" />' +
    //                     '</div>' +
    //                 '{{#if isTouchDevice}}</a>{{/if}}' +
    //             '</div>' +
    //             '{{#if includeWidgets}}' +
    //                 '<div class="social-widgets">' +
    //                     '{{#if isIntroPanel}}' +
    //                         '<div class="social-widget twitter"><a href="https://twitter.com/iamalwayshungry" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @iamalwayshungry</a></div>' +
    //                         '<div class="social-widget facebook"><iframe src="//www.facebook.com/plugins/like.php?href={{facebookURL}}&amp;send=false&amp;layout=button_count&amp;width=80&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;locale=en_US" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:21px;" allowTransparency="true"></iframe></div>' +
    //                         '<div class="social-widget pinterest last"><a href="{{pinterestURL}}" target="_blank"><img src="https://payload47.cargocollective.com/1/0/833/3258214/pinterest-widget2.png" width="57" height="20" alt="Follow Me on Pinterest" /></a></div>' +
    //                     '{{else}}' +
    //                         '<div class="social-widget twitter">' +
    //                             '<iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/tweet_button.html?url={{twitterURL}}&text={{twitterText}}" style="width:57px; height:20px;"></iframe>' +
    //                         '</div>' +
    //                         '<div class="social-widget facebook"><a href="{{facebookURL}}" target="_blank"><img src="https://payload47.cargocollective.com/1/0/833/3258214/facebook-widget-share_26.png" width="60" height="20"></a></div>' +
    //                         '<div class="social-widget pinterest last"><a href="javascript:void((function(){var e=document.createElement(\'script\');e.setAttribute(\'type\',\'text/javascript\');e.setAttribute(\'charset\',\'UTF-8\');e.setAttribute(\'src\',\'https://assets.pinterest.com/js/pinmarklet.js?r=\'+Math.random()*99999999);document.body.appendChild(e)})());" title="Pin It" id="BigPinItButton"><img src="//assets.pinterest.com/images/PinExt.png"></a></div>' +
    //                     '{{/if}}' +
    //                 '</div>' +
    //             '{{/if}}' +
    //         '</div>' +
    //     '</div>',
    projectPanel: '' +
        '<div id="project-title">{{projectTitle}}</div>' +
        '{{#if fullscreenGalleryEnabled}}' +
            '<div class="divider"></div>' +
            '<div id="image-nav">1 / {{numImages}}</div>' +
        '{{/if}}' +
        '{{#if hasProjectDetails}}' +
            '<div class="divider"></div>' +
            '<div id="details-button"><a href="">MORE</a></div>' +
        '{{/if}}',
    projectDetails: '' +
        '<div id="project-details">' +
            '<div class="project-details-bg"></div>' +
            '<div class="project-details-copy"></div>' +
        '<div>',
    footer: '' +
        '<div class="footer">' +
            '<ul>' +
                '<li>IAAH / Iamalwayshungry</li>' +
                '<li>2041 Magazine St. Unit C</li>' +
                '<li>New Orleans, LA. 70130</li>' +
                '<li><a href="mailto:ask@iamalwayshungry.com">ask@iamalwayshungry.com</a></li>' +
            '</ul>' +
            '<ul>' +
                '<li><a href="https://twitter.com/#!/iamalwayshungry" target="_blank">Twitter</a></li>' +
                '<li><a href="https://www.facebook.com/IAAH.IAMALWAYSHUNGRY" target="_blank">Facebook</a></li>' +
                '<li><a href="https://pinterest.com/nessim_higson/" target="_blank">Pinterest</a></li>' +
                '<li><a href="https://www.yesyesyall.org" target="_blank">Yes Yes Y\'all</a></li>' +
            '</ul>' +
            '{{#if includeCredits}}' +
            '<ul id="credits">' +
                '<li>Development by <a href="https://www.onnoschwanen.com" target="_blank">Onno Schwanen</a></li>' +
            '</ul>' +
            '{{/if}}' +
            '{{#if includeCargoBranding}}' +
                '<div id="cargo-branding">' +
                    '<div class="cargo_link">Running on <a href="https://cargocollective.com">Cargo</a></div>' +
                '</div>' +
            '{{/if}}' +
            '<div class="clear-both"></div>' +
        '</div>'
};