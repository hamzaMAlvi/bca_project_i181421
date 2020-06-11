pragma solidity >=0.4.21 <0.7.0;


contract MedicalRecordsStorage {
    address payable public admin;

    constructor() public {
        admin = msg.sender;
        // if (_previousContract != address(0)){
        //     require(msg.sender==_previousContract);
        // }
    }

    modifier restricted() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function destroy() public restricted {
        selfdestruct(admin);
    }

    struct Doctor {
        string name;
        uint256[] writtenMedicalReports;
        uint256[] writtenMedicalCertificates;
        uint256[] writtenPrescriptions;
    }
    address[] public doctors;
    mapping(address => Doctor) public doctorsInfo;

    function getCountOfPres(address _doctor) public view returns (uint256) {
        return doctorsInfo[_doctor].writtenPrescriptions.length;
    }

    function getPresId(address _doctor, uint256 i)
        public
        view
        returns (uint256)
    {
        return doctorsInfo[_doctor].writtenPrescriptions[i];
    }

    function getDoctor(address _doctor) public view returns (string memory) {
        return doctorsInfo[_doctor].name;
    }

    function isDoctorPresent(address _doctor) public view returns (bool) {
        bool present = false;
        for (uint256 i = 0; i < getDoctorsCount(); i++) {
            if (doctors[i] == _doctor) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier doctorExists() {
        require(
            isDoctorPresent(msg.sender),
            "You are not present in list of authorized doctors"
        );
        _;
    }

    function getDoctorsCount() public view returns (uint256) {
        return doctors.length;
    }

    function addDoctor(address _doctor, string memory _name) public restricted {
        doctors.push(_doctor);
        doctorsInfo[_doctor].name = _name;
    }

    struct MedicalStore {
        string name;
        string location;
        string owner;
    }
    address[] public medicalStores;
    mapping(address => MedicalStore) public medicalStoresInfo;

    function getMedicalStore(address _ms)
        public
        view
        returns (string memory, string memory, string memory)
    {
        return (
            medicalStoresInfo[_ms].name,
            medicalStoresInfo[_ms].location,
            medicalStoresInfo[_ms].owner
        );
    }

    function isMSPresent(address _addr) public view returns (bool) {
        bool present = false;
        for (uint256 i = 0; i < getMedicalStoresCount(); i++) {
            if (medicalStores[i] == _addr) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier medicalStoreExists() {
        require(
            isMSPresent(msg.sender),
            "You are not present in list of authorized medical stores"
        );
        _;
    }

    function getMedicalStoresCount() public view returns (uint256) {
        return medicalStores.length;
    }

    function addMedicalStore(
        address _medicalStore,
        string memory _name,
        string memory _loc,
        string memory _owner
    ) public restricted {
        medicalStores.push(_medicalStore);
        MedicalStore storage newMS = medicalStoresInfo[_medicalStore];
        newMS.name = _name;
        newMS.location = _loc;
        newMS.owner = _owner;
    }

    struct Patient {
        string name;
        uint256 age;
        uint256 weight;
        uint256 height;
        string habits;
        address[] links;
        mapping(address => string) relation;
        uint256[] medReports;
        uint256[] medCertificates;
        uint256[] prescripts;
    }
    address[] public patients;
    mapping(address => Patient) public patientsInfo;

    function getPatientName(address _patient)
        public
        view
        returns (string memory)
    {
        return patientsInfo[_patient].name;
    }

    function getCountOfPresP(address _patient) public view returns (uint256) {
        return patientsInfo[_patient].prescripts.length;
    }

    function getPresIdP(address _patient, uint256 i)
        public
        view
        returns (uint256)
    {
        return patientsInfo[_patient].prescripts[i];
    }

    function isPatientPresent(address _addr) public view returns (bool) {
        bool present = false;
        for (uint256 i = 0; i < getPatientsCount(); i++) {
            if (patients[i] == _addr) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier patientExists(address _patient) {
        require(
            isPatientPresent(_patient),
            "Patient has not been added by a doctor"
        );
        _;
    }

    function addPatientLink(
        address _patient,
        address _addr,
        string memory _relation
    ) public doctorExists patientExists(_patient) {
        patientsInfo[_patient].links.push(_addr);
        patientsInfo[_patient].relation[_addr] = _relation;
    }

    function addPatient(
        address _patient,
        string memory _name,
        uint256 _age,
        uint256 _weight,
        uint256 _height,
        string memory _habits
    ) public doctorExists {
        patients.push(_patient);
        Patient storage newPatient = patientsInfo[_patient];
        newPatient.name = _name;
        newPatient.age = _age;
        newPatient.weight = _weight;
        newPatient.height = _height;
        newPatient.habits = _habits;
    }

    function getPatientsCount() public view returns (uint256) {
        return patients.length;
    }

    struct Prescription {
        address writtenBy;
        address writtenTo;
        // string[] prescribedMedicine;
        // mapping(string => string) usage;
        string prescribedMedicines;
        string usages;
        string comments;
    }
    uint256[] public prescriptions;
    mapping(uint256 => Prescription) public prescriptionsInfo;

    function getPrescription(uint256 _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            getDoctor(prescriptionsInfo[_id].writtenBy),
            getPatientName(prescriptionsInfo[_id].writtenTo),
            prescriptionsInfo[_id].prescribedMedicines,
            prescriptionsInfo[_id].usages,
            prescriptionsInfo[_id].comments
        );
    }

    function isPrescriptionPresent(uint256 _id) public view returns (bool) {
        bool present = false;
        for (uint256 i = 0; i < getPrecriptionsCount(); i++) {
            if (prescriptions[i] == _id) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier prescriptionExists(uint256 _id) {
        require(
            isPrescriptionPresent(_id),
            "Prescription with given id is not present"
        );
        _;
    }

    // function addPrecriptionData(
    //     uint256 _id,
    //     string memory _medicine,
    //     string memory _usage
    // ) public doctorExists prescriptionExists(_id) {
    //     prescriptionsInfo[_id].prescribedMedicine.push(_medicine);
    //     prescriptionsInfo[_id].usage[_medicine] = _usage;
    // }

    function addPrescription(
        address _writtenTo,
        string memory _medicines,
        string memory _usages,
        string memory _comments
    ) public doctorExists patientExists(_writtenTo) returns (uint256) {
        uint256 id = getPrecriptionsCount() + 1;
        prescriptions.push(id);
        prescriptionsInfo[id].writtenBy = msg.sender;
        prescriptionsInfo[id].writtenTo = _writtenTo;
        prescriptionsInfo[id].prescribedMedicines = _medicines;
        prescriptionsInfo[id].usages = _usages;
        prescriptionsInfo[id].comments = _comments;
        doctorsInfo[msg.sender].writtenPrescriptions.push(id);
        patientsInfo[_writtenTo].prescripts.push(id);
    }

    function getPrecriptionsCount() public view returns (uint256) {
        return prescriptions.length;
    }

    struct MedicalCertificate {
        address writtenBy;
        address writtenTo;
        string medicalProblems;
        string currentMedications;
        string physicalDisability;
        string mentalCondition;
        string comments;
    }
    uint256[] public medicalCertificates;
    mapping(uint256 => MedicalCertificate) public medicalCertificatesInfo;

    function isMedicalCertificatePresent(uint256 _id)
        public
        view
        returns (bool)
    {
        bool present = false;
        for (uint256 i = 0; i < getMedicalCertificatesCount(); i++) {
            if (medicalCertificates[i] == _id) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier medicalCertificateExists(uint256 _id) {
        require(
            isMedicalCertificatePresent(_id),
            "Medical Certificate with given id is not present"
        );
        _;
    }

    function addMedicalCertificate(
        address _writtenTo,
        string memory _medicalProblems,
        string memory _currentMedications,
        string memory _physicalDisability,
        string memory _mentalCondition,
        string memory _comments
    ) public doctorExists patientExists(_writtenTo) returns (uint256) {
        uint256 id = getMedicalCertificatesCount() + 1;
        medicalCertificates.push(id);
        medicalCertificatesInfo[id].writtenBy = msg.sender;
        medicalCertificatesInfo[id].writtenTo = _writtenTo;
        medicalCertificatesInfo[id].medicalProblems = _medicalProblems;
        medicalCertificatesInfo[id].currentMedications = _currentMedications;
        medicalCertificatesInfo[id].physicalDisability = _physicalDisability;
        medicalCertificatesInfo[id].mentalCondition = _mentalCondition;
        medicalCertificatesInfo[id].comments = _comments;
        doctorsInfo[msg.sender].writtenMedicalCertificates.push(id);
        patientsInfo[_writtenTo].medCertificates.push(id);
    }

    function getMedicalCertificatesCount() public view returns (uint256) {
        return medicalCertificates.length;
    }

    struct MedicalReport {
        address writtenBy;
        address writtenTo;
        string HIVTest;
        string TBTest;
        string bloodPressure;
        string malaria;
        string comments;
    }
    uint256[] public medicalReports;
    mapping(uint256 => MedicalReport) public medicalReportsInfo;

    function isMedicalReportPresent(uint256 _id) public view returns (bool) {
        bool present = false;
        for (uint256 i = 0; i < getMedicalReportsCount(); i++) {
            if (medicalReports[i] == _id) {
                present = true;
                break;
            }
        }
        return present;
    }

    modifier medicalReportExists(uint256 _id) {
        require(
            isMedicalReportPresent(_id),
            "Medical Report with given id is not present"
        );
        _;
    }

    function addMedicalReport(
        address _writtenTo,
        string memory _HIVTest,
        string memory _TBTest,
        string memory _bloodPressure,
        string memory _malaria,
        string memory _comments
    ) public doctorExists patientExists(_writtenTo) returns (uint256) {
        uint256 id = getMedicalReportsCount() + 1;
        medicalReports.push(id);
        medicalReportsInfo[id].writtenBy = msg.sender;
        medicalReportsInfo[id].writtenTo = _writtenTo;
        medicalReportsInfo[id].HIVTest = _HIVTest;
        medicalReportsInfo[id].TBTest = _TBTest;
        medicalReportsInfo[id].bloodPressure = _bloodPressure;
        medicalReportsInfo[id].malaria = _malaria;
        medicalReportsInfo[id].comments = _comments;
        doctorsInfo[msg.sender].writtenMedicalReports.push(id);
        patientsInfo[_writtenTo].medReports.push(id);
    }

    function getMedicalReportsCount() public view returns (uint256) {
        return medicalReports.length;
    }
}
