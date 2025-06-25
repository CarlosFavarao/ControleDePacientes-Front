import * as angular from 'angular';
import 'angular-ui-router';

import { homePageModule } from './home-page/index';
import { registerHospitalModule } from './modules/register-hospital/index';
import { registerPatientModule } from "./modules/register-patient/index";
import { admissionModule } from './modules/admission/index';
import { logPatientHistoryModule } from './modules/log-patient-history/index';
import { logBedHistoryModule } from './modules/log-bed-history/index';

const app = angular.module('meuApp', [
  'ui.router',
  homePageModule.name,
  registerHospitalModule.name,
  registerPatientModule.name,
  admissionModule.name,
  logPatientHistoryModule.name,
  logBedHistoryModule.name
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
      templateUrl: 'src/modules/register-hospital/register-hospital.html',
      controller: 'RegisterHospitalController',
      controllerAs: 'vm'
    });

    $stateProvider.state('registerPatient', {
      url: '/register-patient',
      templateUrl: 'src/modules/register-patient/register-patient.html',
      controller: 'RegisterPatientController',
      controllerAs: 'vm'
    });

    $stateProvider.state('admission', {
      url: '/admission',
      templateUrl: 'src/modules/admission/admission.html',
      controller: 'AdmissionController',
      controllerAs: 'vm'
    });

    $stateProvider.state('logPatientHistory', {
      url: '/log-patient-history',
      templateUrl: 'src/modules/log-patient-history/log-patient-history.html',
      controller: 'LogPatientHistoryController',
      controllerAs: 'vm'
    });

    $stateProvider.state('logBedHistory', {
      url: '/log-bed-history',
      templateUrl: 'src/modules/log-bed-history/log-bed-history.html',
      controller: 'LogBedHistoryController',
      controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/home');
  }
]);
