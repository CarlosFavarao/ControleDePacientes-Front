import { AvailableBedDTO, Page } from '../types';

export class AdmissionController {
    static $inject = ['$http'];

    admittedPatients: any[] = [];
    patientResults: any[] = [];
    hospitals: any[] = [];

    patientName: string = '';
    selectedPatientId: number | null = null;
    selectedHospitalId: number = -1
    selectedSpecialty: string = 'all';

    availableBeds: any[] = [];
    selectedBedId: number | null = null;

    SelectedDoctorId: number = 1;

    bedPageNumber: number = 0;
    bedPageSize: number = 5;
    bedTotalPages: number = 0;

    constructor(private $http : angular.IHttpService){
        this.getAdmittedPatients();
        this.loadHospitals();
    }

    getAdmittedPatients(){
        this.$http.get('http://localhost:8080/adm/currently-admitted')
            .then(response => {this.admittedPatients = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes Admitidos', error);})
    }

    loadHospitals(){
        this.$http.get('http://localhost:8080/hospitals')
            .then(response => {this.hospitals = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Hospitais', error);})
    }

    selectPatient(patient: any) {
        this.patientName = patient.name;
        this.selectedPatientId = patient.id;
        this.patientResults = [];
    }

    admitPatient() {
        if (!this.selectedPatientId || !this.selectedBedId) {
            alert('Selecione um paciente e uma cama.');
            return;
        }

        const payload = {
            patientId: this.selectedPatientId,
            bedId: this.selectedBedId,
            doctorId: this.SelectedDoctorId
        };

        this.$http.post('http://localhost:8080/adm', payload)
            .then(() => {
                alert('Paciente internado com sucesso!');
                this.clearForm();
                this.getAdmittedPatients();
            })
            .catch(error => {
                console.error('Erro ao internar paciente', error);
                alert('Erro ao internar paciente.');
            });
    }

    dischargePatient(patientId: number) {
        this.$http.put(`http://localhost:8080/adm/discharge/${patientId}`, {})
            .then(() => {
                alert('Paciente em Alta!');
                this.getAdmittedPatients();
            })
            .catch(error => {console.error('Erro ao dar alta ao Paciente', error);
                alert('Erro ao dar alta ao Paciente.');
            }
            )
    }

    searchPatients(name: string){
        this.$http.get(`http://localhost:8080/patients/search/${name}`)
            .then(response => {this.patientResults = response.data as any;})
            .catch (error => {console.error('Erro ao Buscar Pacientes', error);});
    }

    loadAvailableBeds() {
        const baseUrl = 'http://localhost:8080';
        let url = '';

        const hospitalSelected = this.selectedHospitalId && this.selectedHospitalId != -1;
        const specialtySelected = this.selectedSpecialty && this.selectedSpecialty !== 'all';

        if (hospitalSelected && specialtySelected) {
            url = `${baseUrl}/beds/available-by-hospital-and-specialty/${this.selectedHospitalId}/${this.selectedSpecialty}`;
        } else if (hospitalSelected) {
            url = `${baseUrl}/beds/available-by-hospital/${this.selectedHospitalId}`;
        }

        url += `?page=${this.bedPageNumber}&size=${this.bedPageSize}`;

        this.$http.get<Page<AvailableBedDTO>>(url)
            .then(response => {
                this.availableBeds = response.data.content;
                this.bedTotalPages = response.data.totalPages;
            })
            .catch(error => console.error('Erro ao buscar leitos disponíveis', error));
    }

    clearBeds() {
        this.bedPageNumber = 0;
        this.bedPageSize = 5;
        this.bedTotalPages = 0;
        this.availableBeds = [];
    }

    clearForm() {
        this.patientName = '';
        this.selectedPatientId = null;
        this.selectedHospitalId = -1;
        this.selectedSpecialty = 'all';
        this.selectedBedId = null;
        this.availableBeds = [];
        this.patientResults = [];
    }

}