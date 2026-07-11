var Sharing = (function() {

    var _sharing = document.querySelector('.sharing');
    var _list = document.querySelector('.sharing ul');
    var visible = false;

    function init () {

        console.log('sharing');

        TweenMax.set(_list, {y: 20});

        if (isTouch) {

            _sharing.addEventListener('click', toggle.bind(this));
        } else {

            _sharing.addEventListener('mouseenter', showSharing.bind(this));
            _sharing.addEventListener('mouseleave', hideSharing.bind(this));            
        }

        parseSharingLinks();
    }

    function toggle() {

        if (visible) {
            hideSharing();
        } else {
            showSharing();
        }
    }

    function showSharing() {

        TweenMax.to(_list, 0.3, {opacity: 1, y: 0, onComplete: function() {
            visible = true;
        }});
    }

    function hideSharing() {

        TweenMax.to(_list, 0.3, {opacity: 0, y: 20, onComplete: function() {
            visible = false;
        }});
    }

    function parseSharingLinks() {

        // twitter
        var twitterShare = document.querySelector('[data-js="twitter-share"]');
        twitterShare.onclick = function(e) {
            e.preventDefault();
            console.log('onclick', e.target)
            var w = 600, h = 350;
            var l = (screen.width / 2) - (w / 2);
            var t = (screen.height / 2) - (h / 2);
            var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL + '&text=' + e.target.getAttribute('data-tweet'), 'twitter-popup', 'height='+h+',width='+w+',left='+l+',top='+t);
            if(twitterWindow.focus) { 
                twitterWindow.focus(); 
            }
            return false;
        }

        // facebook
        var facebookShare = document.querySelector('[data-js="facebook-share"]');
        facebookShare.onclick = function(e) {
            e.preventDefault();
            var w = 600, h = 350;
            var l = (screen.width / 2) - (w / 2);
            var t = (screen.height / 2) - (h / 2);
            var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height='+h+',width='+w+',left='+l+',top='+t);
            if(facebookWindow.focus) { 
                facebookWindow.focus(); 
            }
            return false;
        }

        // facebook
        var linkedinShare = document.querySelector('[data-js="linkedin-share"]');
        linkedinShare.onclick = function(e) {
            e.preventDefault();
            var w = 600, h = 350;
            var l = (screen.width / 2) - (w / 2);
            var t = (screen.height / 2) - (h / 2);
            var linkedinWindow = window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + document.URL, 'linkedin-popup', 'height='+h+',width='+w+',left='+l+',top='+t);
            if(linkedinWindow.focus) { 
                linkedinWindow.focus(); 
            }
            return false;
        }

        // whatsapp
        var whatsappShare = document.querySelector('[data-js="whatsapp-share"]');
        whatsappShare.href = 'whatsapp://send?text=Crackkked.com';
    }

    init();

})();
