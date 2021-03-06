(function() {
var jQuery;
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    jQuery = window.jQuery;
    main();
}

function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict(true);
    main();
}
function main() {
    jQuery(document).ready(function($) {
        var css_link = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: "<%= URI.join(root_url, path_to_stylesheet("widget.css")).to_s %>"
        });
        css_link.appendTo('head');

        var jsonp_url = <%= raw widgets_url(format: "json").to_json %>;
        $.ajax({
          url:       jsonp_url,
          data:      MySiteWidget,
          dataType:  "jsonp",
          success:   function(data) {
            // modify this part
            $.each(data, function(i,d) {
              $('.mysite-widget').append(d.template)
            })
          }
        });
    });
}
})();
