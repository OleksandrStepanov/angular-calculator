app.controller("calcCtrl", ['$scope', '$location', '$state', function($scope, $location, $state) {
    $scope.modeBtn = $location.url() == '/advanced' ? 'Simple' : 'Advanced';
    $scope.state = $location.url() == '/advanced' ? 'advanced' : 'simple';
    $scope.calculation = '';
    $scope.expression = null;
    $scope.isDot = false;
    $scope.changeMode = function(){
        $scope.state = $scope.state == 'advanced' ? 'simple' : 'advanced';
        $state.go($scope.state);
        $scope.modeBtn = $scope.modeBtn == 'Advanced' ? 'Simple' : 'Advanced';
        $scope.modeName = $scope.modeName == 'advanced' ? '' : 'advanced';
    }
    $scope.numberButton = function(number) {
        if (number === '.') {
            if (!$scope.isDot) {
                $scope.isDot = true;
            } else{
                return;
            }
        }
        $scope.calculation = $scope.calculation.concat(number);
    }
    $scope.binaryOperation = function(operation) {
        $scope.lastChar = $scope.calculation[$scope.calculation.length - 1];
        if(isNaN($scope.lastChar)) {
            $scope.calculation = $scope.calculation.replace(/[^.]$/, operation);
            return;
        }
        $scope.expression = eval($scope.calculation);
        $scope.calculation = $scope.calculation.concat(operation);
    }
    $scope.unaryOperation = function(operation) {
        $scope.expression = eval($scope.calculation);
        $scope.result = '';
        switch(operation) {
            case 'sin':
                $scope.result = Math.sin($scope.expression);
                break;
            case 'tan':
                $scope.result = Math.tan($scope.expression);
                break;
            case 'cos':
                $scope.result = Math.cos($scope.expression);
                break;
            case 'pow':
                $scope.result = Math.pow($scope.expression, 2);
                break;
            case 'sqrt':
                if ($scope.expression < 0) {
                    alert("Can't calculate square root of negative number");
                    break;
                }
                $scope.result = Math.sqrt($scope.expression);
                break;
            case 'factorial':
                if ($scope.expression < 0) {
                    alert("Can't calculate factorial of negative number");
                    break;
                }
                $scope.result = $scope.factorial($scope.expression);
            default:
                break;          
        }
        $scope.calculation = String($scope.result || $scope.calculation);
    }
    $scope.factorial = function(n) {
        return n ? n * $scope.factorial(n - 1) : 1;
    }
    $scope.calculate = function() {
        $scope.lastChar = $scope.calculation[$scope.calculation.length - 1];
        if(isNaN($scope.lastChar)) {
            return;
        }
        $scope.calculation = String(eval($scope.calculation));
    }
    $scope.save = function() {
        $scope.expression = eval($scope.calculation);
        $scope.calculation = '';
        localStorage.setItem('result', $scope.expression);
    }
    $scope.clearAll = function() {
        $scope.calculation = '';
    }
    $scope.clearMemory = function() {
        $scope.calculation = '';
        localStorage.removeItem('result');
    }
    $scope.clearPrevious = function() {
        $scope.calculation = $scope.calculation.substring(0, $scope.calculation.length - 1);
    }
}]);
