import * as angular from 'angular';
import { LogPatientHistoryController } from './log-patient-history.controller';

export const logPatientHistoryModule = angular.module('logPatientHistoryModule', []);

logPatientHistoryModule.controller('LogPatientHistoryController', LogPatientHistoryController);
