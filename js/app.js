(function(angular) {
    'use strict';
    /*
     *    创建主模块
     *
     */
    var todoMvc = angular.module('todoMvc', ['ngRoute']);

    //路由配置
    todoMvc.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/:status?',{
                controller:'todoMvcController',
                templateUrl: './template.html'
            })
            .otherwise({redirectTo:'/'});
    }]);


    //注册主控制器

    todoMvc.controller('todoMvcController', [
        '$scope', 
        '$routeParams',
        '$route',
        function($scope, $routeParams,$route) {

        //文本框需要一个模型
        $scope.text = '';

        //任务列表页需要一个
        //每个任务的结构{id:1, text:'学习', completed: true}
        $scope.todos = [
            { id: 1, text: '学习', completed: true },
            { id: 2, text: '读书', completed: false },
            { id: 3, text: '睡觉', completed: false }
        ];

        //添加todo
        $scope.add = function() {
            if ($scope.text === '') {
                return;
            }

            $scope.todos.push({
                id: Math.random(),
                text: $scope.text,
                completed: false
            })

            //清空模型数据
            $scope.text = '';
        };



        //处理删除
        $scope.remove = function(id) {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].id === id) {
                    $scope.todos.splice(i, 1);
                    break;
                }
            }
        }

        //清空completed元素
        $scope.clear = function() {
            var result = [];
            for (var i = 0; i < $scope.todos.length; i++) {
                if (!$scope.todos[i].completed) {
                    result.push($scope.todos[i]);
                }
            }
            $scope.todos = result;
        }

        //没有completed时不显示clear completed
        $scope.isCompleted = function() {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].completed) {
                    return true;
                }
            }
            return false;
        }

        //选中所有
        var now = true;
        $scope.checkAll = function() {

            for (var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].completed = now;
            }
            now = !now;
        }

        //状态筛选

       /*
       *    $location 方式
       *   
         $scope.location = $location;
        //监视，由于$watch只能监视$scope的成员，所以赋值一个$scope的成员
        $scope.$watch('location.path()', function(now, old) {

            $scope.selector = (function() {
                //1.拿到锚点
                //var hash = window.location.hash;
                //用注入$location的方式更好，不依赖window对象
                //console.log(now);
                //2.更改selector
                switch (now) {
                    case '/active':
                        return false;
                    case '/completed':
                        return true;
                    default:
                        break;
                }
            })();

        })*/


        /*路由方式*/
        var status = $routeParams.status;
        $scope.selector = {};
            console.log(status);
            switch (status) {
                case 'active':
                    $scope.selector = {completed:false};
                    break;
                case 'completed':
                    $scope.selector = {completed:true};
                    break;
                default:
                    //TypeError: $route.updateParmas is not a function
                    //$route.updateParmas({status:''})
                    $scope.selector = {};
                    return;
                }

                console.log($scope.selector);

    }])

})(angular);
