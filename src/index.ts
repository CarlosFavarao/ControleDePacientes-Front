import * as angular from 'angular';
import 'angular-ui-router';

import { homePageModule } from './home-page/index';
import { registerHospitalModule } from './modules/register/index';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  registerHospitalModule.name
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'src/home-page/home-page.html',
      controller: 'HomePageController',
      controllerAs: 'vm'
    });

    $stateProvider.state('registerHospital', {
      url: '/register-hospital',
      templateUrl: 'src/modules/register/register-hospital.html',
      controller: 'RegisterHospitalController',
      controllerAs: 'vm'
    }); 

    $urlRouterProvider.otherwise('/home');
  }
]);
