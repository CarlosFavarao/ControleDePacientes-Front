import * as angular from 'angular';
import { LogBedHistoryController } from './log-bed-history.controller';

export const logBedHistoryModule = angular.module('logBedHistoryModule', []);

logBedHistoryModule.controller('LogBedHistoryController', LogBedHistoryController);