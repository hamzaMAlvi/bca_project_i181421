const MedicalRecordsStorage = artifacts.require("MedicalRecordsStorage");

module.exports = function (deployer) {
    deployer.deploy(MedicalRecordsStorage);
};
