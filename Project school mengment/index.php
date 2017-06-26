<!DOCTYPE html>
<html lang="en" ng-app="appModule">
    <head>
        <title>college</title>
        <meta charset="utf-8" />

        <!--jQuery-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

        <!--boostap CDN-->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <!--angular CDN-->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-route.min.js"></script>

        <!--CSS pages-->
        <link href="CSS/site.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
        
        <!--javascript-->
        <script src="javascript/appModule.js"></script>
        <script src="javascript/logInModule.js"></script> 
        <script src="javascript/schoolModule.js"></script>
        <script src="javascript/administrationModule.js"></script>
        <script src="dist/sweetalert.min.js"></script>


        <!--fonts-awesome-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    </head>
    <body>
        <div ng-view autoscroll></div>
    </body>
</html>
