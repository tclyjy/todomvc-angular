(function (angular) {
	'use strict';
/*
*    创建主模块
*
*/
	var todoMvc = angular.module('todoMvc',[]);

	//注册主控制器
	
	todoMvc.controller('todoMvcController',['$scope',function($scope){

		//文本框需要一个模型
		$scope.text = '';

		//任务列表页需要一个
		//每个任务的结构{id:1, text:'学习', completed: true}
		$scope.todos = [
			{id:1, text:'学习', completed: true},
			{id:2, text:'读书', completed: false},
			{id:3, text:'睡觉', completed: false}
		];

		//添加todo
		$scope.add = function(){
			if($scope.text===''){
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
		$scope.remove = function (id){
			for(var i = 0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					$scope.todos.splice(i, 1);
					break;
				}
			}
		}

		//清空completed元素
		$scope.clear = function (){
			var result = [];
			for(var i = 0;i<$scope.todos.length;i++){
				if(!$scope.todos[i].completed){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		}

		//没有completed时不显示clear completed
		$scope.isCompleted = function() {
			for(var i = 0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		//选中所有
		var now = true;
		$scope.checkAll = function (){
			
			for(var i = 0;i<$scope.todos.length;i++){
				$scope.todos[i].completed = now;
			}
			now = !now;
		}
	}])

})(angular);
