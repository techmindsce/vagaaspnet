var gulp = require("gulp");
var rename = require("gulp-rename");
var bower = require("gulp-bower");
var watch = require("gulp-watch");
var cssmin = require("gulp-cssmin");
var stripCssComments = require("gulp-strip-css-comments");
var concat = require("gulp-concat");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var stringify = require("stringify");
var util = require("gulp-util");
var stylus = require("gulp-stylus");


var app_stylus_base = "Assets/Style/app/app.styl";
var app_style_dest = "Assets/Style";
var vendor_script_dest = "Assets/Scripts/vendor";
var vendor_style_dest = "Assets/Style/vendor";

var vendors_scripts_files_srcs = ["bower_components/knockout/dist/knockout.js",
                                    "bower_components/jquery/jquery.min.js",
                                    "bower_components/bootstrap/dist/js/bootstrap.min.js",
                                    "bower_components/requirejs/require.js",
                                    "bower_components/requirejs-text/text.js",
                                    "bower_components/toastr/toastr.min.js"];
var vendors_styles_files_srcs = [
        "bower_components/bootstrap/dist/css/bootstrap.min.css",
        "bower_components/bootstrap/dist/css/bootstrap-theme.min.css",
        "bower_components/durandal/css/durandal.css",
        "bower_components/font-awesome/css/font-awesome.min.css",
        "bower_components/toastr/toastr.min.css"

];

var vendors_fonts_files_srcs = [
        "bower_components/bootstrap/dist/fonts/**",
        "bower_components/font-awesome/fonts/**"
];


gulp.task("default", ["bower", "vendor-files", "bundle-app", "build-stylus"], function () {

});

gulp.task("build-stylus", function () {
    util.log(util.colors.green("STARTING TO BUILD STYLUS..."));
    gulp.src(app_stylus_base)
        .pipe(stylus())
        .pipe(gulp.dest(app_style_dest))
        .on("end", function () { util.log(util.colors.green("STYLUS BUILDED...")); });
});

gulp.task("bower", function () {
    return bower();
});

gulp.task("vendor-files", function () {
    installDurandalFiles();
    installAdminLte();
    prepareVendorStyles();
    return gulp.src(vendors_scripts_files_srcs)
            .pipe(gulp.dest(vendor_script_dest));
});

gulp.task("bundle-app", function () {
    return browserify({ entries: ["Assets/Scripts/app/all.js"] })
                        .transform(stringify([".html"]))
                        .bundle()
                        .pipe(source("app.bundled.js"))
                        .pipe(gulp.dest("Assets/Scripts"));
});

function installDurandalFiles() {
    gulp.src(["bower_components/durandal/js/**"])
       .pipe(gulp.dest(vendor_script_dest + "/durandal"));
}

function installAdminLte() {
    var stylesAdminLte = ["bower_components/adminlte/dist/css/AdminLTE.min.css",
                         "bower_components/adminlte/dist/css/skins/_all-skins.min.css"];

    var scriptsAdminLte = ["bower_components/adminlte/dist/js/app.min.js",
                            "bower_components/adminlte/plugins/slimScroll/jquery.slimscroll.min.js"];

    gulp.src(stylesAdminLte).pipe(gulp.dest(vendor_style_dest + "/css"));
    gulp.src(scriptsAdminLte).pipe(gulp.dest(vendor_script_dest));
}

function prepareVendorStyles() {
    gulp.src(vendors_styles_files_srcs)
        .pipe(gulp.dest(vendor_style_dest + "/css"));
    prepareVendorFonts();
};

function prepareVendorFonts() {
    gulp.src(vendors_fonts_files_srcs)
        .pipe(gulp.dest(vendor_style_dest + "/fonts"));
};

