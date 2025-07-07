import { Page, BedHistoryDTO, BedResponseDTO } from '../types';

export class LogBedHistoryController {
    static $inject = ['$http'];

    beds: any[] = [];
    bedHistoryLogs: any[] = [];
    bedHistoryId: number = 0;

    historyPageNumber: number = 0;
    historyPageSize: number = 5;
    historyTotalPages: number = 0;

    listBeds(){
        this.$http.get('http://localhost:8080/beds')
            .then(response => {this.beds = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Camas', error);})
    }

    constructor(private $http : angular.IHttpService){
        this.listBeds();
    }

    showBedHistory(bedId: number){

        this.bedHistoryId = bedId;
        this.$http.get<Page<BedHistoryDTO>>(`http://localhost:8080/adm/history/bed/${bedId}?page=${this.historyPageNumber}&size=${this.historyPageSize}`)
            .then(response => {
                this.bedHistoryLogs = response.data.content;
                this.historyTotalPages = response.data.totalPages;
            })
            .catch (error => {console.error('Erro ao Buscar Camas', error);})
    }

    nextPage(){
        if(this.historyPageNumber < this.historyTotalPages - 1){
            this.historyPageNumber++;
            this.showBedHistory(this.bedHistoryId);
        }
    }

    previousPage(){
        if(this.historyPageNumber > 0){
            this.historyPageNumber--;
            this.showBedHistory(this.bedHistoryId);
        }
    }
}