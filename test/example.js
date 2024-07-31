
const obj = {
    appActionInit: function(api) {
        api.registerApp({
            "name": "js-test",
            "display_name": "JavaScript Test",
            "short_desc": "Test",
            "desc": "Test",
            "logo": "AA==",
            "logo_file_name": "test.svg",
            "logo_mime_type": "image/svg+xml",
        });

        api.registerAction({
            "app": "js-test",
            "action": "test-api",
            "display_name": "Test API",
            "short_desc": "Test API",
            "desc": "Test API",
            "action_code": 2,  // DPAT_API == 2
        });
    }
};
obj