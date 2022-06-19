var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
var necessary_des = 'Wir verwenden Technisch notwendige Cookies, um wesentliche Funktionen der Website auszuführen. Sie werden z. B. verwendet, um Ihre Cookie Einstellungen zu speichern, Ihre Sprachpräferenzen zu speichern, die Leistung zu verbessern, die Benutzererfahrung zu verbessern. Technisch notwendige Cookies werden nicht für das Tracking von Besuchern verwendet! . Diese Cookies sind für das Funktionieren unserer Websites erforderlich.';
var ex_media = 'Wir verwenden Cookies, um die Funktionen unserer Website zu verbessern. Diese Cookies sind für das Funktionieren unserer Websites erforderlich. Diese Cookies werden nicht für das Tracking von Besuchern verwendet!';
// obtain iframemanager object
var manager = iframemanager();

// obtain cookieconsent plugin
var cc = initCookieConsent();

// Configure with youtube embed
manager.run({
    currLang: 'en',
    services : {
        youtube : {
            embedUrl: 'https://www.youtube-nocookie.com/embed/{data-id}',
            // thumbnailUrl: 'https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg',
            iframe : {
                allow : 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;',
            },
            cookie : {
                name : 'cc_youtube',
            },
            languages : {
                en : {
                    notice: 'Dieser Inhalt wird von einer dritten Partei gehostet. Durch die Anzeige des externen Inhalts akzeptieren Sie die <a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Nutzungsbedingungen" target="_blank">Nutzungsbedingungen</a> von youtube.com.',
                    loadBtn: 'Video Laden',
                    loadAllBtn: 'Nicht mehr fragen'
                }
            }
        }
    }
});

// run plugin with config object
cc.run({
    current_lang: 'en',
    autoclear_cookies: true,                    // default: false
    cookie_name: 'cc_cookie',             // default: 'cc_cookie'
    cookie_expiration: 30,                     // default: 182
    page_scripts: true,                         // default: false
    force_consent: false,                        // default: false
    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: '/',                        // default: root
    // cookie_same_site: 'Lax',
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0
    mode: 'opt-in',                               // default: 'info'; could also be 'opt-in' or 'opt-out'
    
    gui_options: {
        consent_modal: {
            layout: 'bar',                    // box,cloud,bar
            position: 'bottom',          // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'box',                      // box,bar
            position: 'left',                   // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){
        console.log('onFirstAction fired');
    },

    onAccept: function(){
        console.log('onAccept fired!')

        // If analytics category is disabled => load all iframes automatically
        if(cc.allowedCategory('ex_media')){
            console.log('iframemanager: loading all iframes');
            manager.acceptService('all');
        }
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange fired!');

        // If analytics category is disabled => ask for permission to load iframes
        if(!cc.allowedCategory('ex_media')){
            console.log('iframemanager: disabling all iframes');
            manager.rejectService('all');
        }else{
            console.log('iframemanager: loading all iframes');
            manager.acceptService('all');
        }
    },

    languages: {
        'en': {
            consent_modal: {
                title: 'Hello, it\'s cookie time!',
                description: 'Unsere Website verwendet Cookies, um einen ordnungsgemäßen Betrieb zu gewährleisten. <a href="https://itsdom.org/datenschutz/" target="_blank "class="cc-link">Datenschutzerklärung</a> | \ <button type="button" data-cc="c-settings" class="cc-link"">Cookie Einstellungen</button>',
                primary_btn: {
                    text: 'Alle Akzeptieren',
                    role: 'accept_all'      //'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Nur Technisch notwendige Cookies',
                    role: 'accept_necessary'       //'settings' or 'accept_necessary'
                },
                revision_message: '<br><br> Dear user, terms and conditions have changed since the last time you visisted!'
            },
            settings_modal: {
                title: 'Cookie Einstellungen',
                save_settings_btn: 'Speichern',
                accept_all_btn: 'Alle Akzeptieren',
                reject_all_btn: 'Alle Ablehnen',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Beschreibung'},
                    {col4: 'Ablauf'},
                    {col5: 'Datenschutzerklärung'}
                ],
                blocks: [
                    {
                        title: 'Cookies bei der Nutzung unserer Website',
                        description: 'Unsere Website verwendet Cookies, um einen ordnungsgemäßen Betrieb zu gewährleisten. <a href="https://itsdom.org/impressum/" target="_blank" class="cc-link">Impressum</a> | <a href="https://itsdom.org/datenschutz/" target="_blank" class="cc-link">Datenschutzerklärung</a>',
                    }, {
                        title: 'Technisch notwendige Cookies',
                        description: necessary_des,
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true  //cookie categories with readonly=true are all treated as "necessary cookies"
                        },
                        cookie_table: [
                            {
                                col1: 'cc_cookie',
                                col2: 'itsdom.org',
                                col3: 'Cookie set by Cookie Consent',
                                col4: '30 days',
                                col5: '<a rel="noreferrer" href="https://itsdom.org/datenschutz/" title="Datenschutzerklärung" target="_blank">Datenschutzerklärung</a>',
                                is_regex: true
                            }
                        ]

                    }, 
                    {
                        title: 'Externe Medien',
                        description: ex_media,
                        toggle: {
                            value: 'ex_media',
                            enabled: false,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: 'cc_youtube',
                                col2: 'itsdom.org',
                                col3: 'Cookie set by iframemanager',
                                col4: '30 days',
                                col5: '<a rel="noreferrer" href="https://itsdom.org/datenschutz/" title="Datenschutzerklärung" target="_blank">Datenschutzerklärung</a>'
                            },
                            {
                                col1: 'YouTube',
                                col2: 'www.youtube-nocookie.com',
                                col3: 'Cookies set by Youtube',
                                col5: '<a rel="noreferrer" href="https://www.youtube.com/t/terms" title="Datenschutzerklärung" target="_blank">Datenschutzerklärung</a>'
                            },
                        ]
                    }, {
                        // title: 'Was sind Cookies?',
                        // description: ' <a class="cc-link" href="https://orestbida.com/contact/">Kontakt</a>.',
                    }
                ]
            }
        }
    }
});
