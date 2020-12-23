# BCA_Project-i181421
Solution to the project of the course Blockchain and its Application offered in Spring 2020 at FAST-NU.

This application is written using React and require ethereum blockchain to operate.

To operate at a local machine, setup Ganache and Truffle.

The smart contracts for blockchain written in solidity are present in folder medical_records_storage/contracts. Deploy these contracts on local ethereum blockchain provided by ganache using truffle before running the application.


The usecases of the project are given below:

1. Admin can add authorized doctors.
2. Admin can add authorized medical stores.
3. Doctors can add patients.
4. Each patient has an id, personal details, habits, etc.
5. Patients are linked together by their relationship e.g. family and friends.
6. Doctors can write prescriptions to patients.
7. Doctors can add medical reports of a patient
8. Doctors can see previous reports and prescriptions of a patient.
9. Medical stores can check a prescription by it’s Id.
10. Doctors can write medical certificates for patients.
11. Patients can see instructions given by their doctors.
