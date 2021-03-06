// Copyright 2012 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Every editor directive should implement an alwaysEditable option. There
// may be additional customization options for the editor that should be passed
// in via initArgs.

oppia.directive('setOfHtmlStringEditor', [
    '$compile', 'OBJECT_EDITOR_URL_PREFIX',
    function($compile, OBJECT_EDITOR_URL_PREFIX) {
  return {
    link: function(scope, element) {
      scope.getTemplateUrl = function() {
        return OBJECT_EDITOR_URL_PREFIX + 'SetOfHtmlString';
      };
      $compile(element.contents())(scope);
    },
    restrict: 'E',
    scope: true,
    template: '<span ng-include="getTemplateUrl()"></span>',
    controller: function($scope) {
      $scope.SCHEMA = {
        type: 'list',
        items: {
          type: 'html'
        }
      };

      if (!$scope.$parent.value) {
        $scope.$parent.value = [];
      }

      $scope.choices = $scope.initArgs.choices;
      $scope.choiceGroup = $scope.$parent.value;

      // The following function is necessary to insert elements into the answer
      // groups for the Item Selection Widget.
      $scope.toggleSelection = function(choice) {
        var index = $scope.$parent.value.indexOf(choice.id);
        if (index > -1) {
          $scope.$parent.value.splice(index, 1);
        } else {
          $scope.$parent.value.push(choice.id);
        }
      };
    }
  };
}]);
