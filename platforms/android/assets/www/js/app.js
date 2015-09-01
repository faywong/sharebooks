// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('index', ['ionic'])

.controller('IndexCtrl', function($scope, $ionicModal) {
    // 测试数据
    $scope.books = [{
        'title': '简爱'
    }, {
        'title': '百年孤独'
    }];

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('upload-book.html', function(modal) {
        $scope.bookModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('sign-in.html', function(modal) {
        $scope.loginModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    // Open our new task modal
    $scope.signin = function() {
        $scope.loginModal.show();
    };


    // Open our new task modal
    $scope.cancelSignin = function() {
        $scope.loginModal.hide();
    };

    $scope.getCover = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            allowEdit: true,
            targetWidth: 480,
            targetHeight: 640,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            $scope.coverSrc = "data:image/jpeg;base64," + imageData;
            $scope.$apply();
        }

        function onFail(message) {
            alert('拍照失败，原因：' + message);
        }
    }

    // Called when the form is submitted
    $scope.scanIsbn = function(book) {
        cordova.plugins.barcodeScanner.scan(
            function(result) {
                $scope.isbnCode = result.text;
                $scope.$apply();
                // alert("扫描了一个二维码\n" +
                //     "值: " + result.text + "\n" +
                //     "格式: " + result.format + "\n" +
                //     "是否取消: " + result.cancelled);
            },
            function(error) {
                alert("扫描失败，原因: " + error);
            }
        );
    };

    // Called when the form is submitted
    $scope.uploadBook = function(book) {
        $scope.books.push({
            title: book.title,
            desc: book.desc,
            img: book.img,
            isbn: book.isbn
        });
        $scope.bookModal.hide();
        book.title = '';
        book.desc = '';
        book.img = '';
        book.isbn = '';
    };

    $scope.selectBook = function(book, index) {
        alert('选中的书籍是: ' + JSON.stringify(book) + ' 位置: ' + index);
    };

    // Open our new task modal
    $scope.newBook = function() {
        $scope.bookModal.show();
    };

    // Close the new task modal
    $scope.cancelUploadBook = function() {
        $scope.bookModal.hide();
    };
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})