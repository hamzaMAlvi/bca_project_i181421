import Web3 from "web3";
import { MRS_ADDRESS, MRS_ABI } from "./config";

function getContract() {
  const web3 = new Web3("http://localhost:7545");
  const contract = new web3.eth.Contract(MRS_ABI, MRS_ADDRESS);
  return contract
}

export async function authenticate(address, type) {
  const contract = await getContract();
  if (type === "Admin") {
    const owner = await contract.methods.admin().call();
    return owner === address;
  } else if (type === "Doctor") {
    const tmp = await contract.methods.isDoctorPresent(address).call();
    return tmp;
  } else if (type === "Patient") {
    const tmp = await contract.methods.isPatientPresent(address).call();
    return tmp;
  } else if (type === "Medical Store") {
    const tmp = await contract.methods.isMSPresent(address).call();
    return tmp;
  }
  return false;
}

async function checkAddress(address) {
  if (Web3.utils.isAddress(address)) {
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    if (accounts.indexOf(address) > -1) {
      return true;
    }
  }
  return false;
}

export async function addDoctor(from_addr, address, name) {
  const tmp = await checkAddress(address);
  if (tmp) {
    await getContract().methods.addDoctor(address, name).send({ from: from_addr });
  }
  return tmp;
}

export async function addMS(from_addr, address, name, owner, location) {
  const tmp = await checkAddress(address);
  if (tmp) {
    const contract = getContract();
    await contract.methods.addMedicalStore(address, name, location, owner).send({ from: from_addr, gas: 1000000 });
  }
  return tmp;
}

export async function getList(type) {
  const contract = await getContract();
  if (type === "Existing Medical Stores") {
    const noMS = await contract.methods.getMedicalStoresCount().call();
    var MSs = ["Name, Location, Owner"]
    for (var i = 0; i < noMS; i++) {
      const addr = await contract.methods.medicalStores(i).call();
      var data = await contract.methods.getMedicalStore(addr).call();
      MSs = MSs.concat(data[0] + ", " + data[1] + ", " + data[2]);
    }
    return MSs;
  }
  const noD = await contract.methods.getDoctorsCount().call();
  var Ds = []
  for (var j = 0; j < noD; j++) {
    const addr = await contract.methods.doctors(j).call();
    const data = await contract.methods.getDoctor(addr).call();
    Ds = Ds.concat(data);
  }
  return Ds;
}

export async function addPatient(from_addr, address, name, age, weight, height, habits) {
  const contract = getContract();
  const tmp1 = await checkAddress(address);
  const tmp2 = await contract.methods.isDoctorPresent(from_addr);
  if (tmp1 && tmp2) {
    await contract.methods.addPatient(address, name, age, weight, height, habits).send({ from: from_addr, gas: 1000000 });
  }
  return tmp1 && tmp2;
}

export async function addPrescription(from, to, meds, usage, comments) {
  const contract = getContract();
  const tmp1 = await contract.methods.isDoctorPresent(from).call();
  const tmp2 = await contract.methods.isPatientPresent(to).call();
  // const id = await contract.methods.getPrecriptionsCount().call();
  if (tmp1 && tmp2) {
    await contract.methods.addPrescription(to, meds, usage, comments).send({ from: from, gas: 1000000 });
    // const medsL = meds.split(',');
    // const usageL = usage.split(',');
    // for (var i = 0; i < medsL.length; i++) {
    //   await contract.methods.addPrecriptionData(id + 1, medsL[i], usageL[i]).send({ from: from, gas: 500000 });
    // }
  }
  return tmp1 && tmp2;
}

export async function addMedicalReport(from, to, hivTest, tbTest, bpTest, malTest, comments) {
  const contract = getContract();
  const tmp1 = await contract.methods.isDoctorPresent(from).call();
  const tmp2 = await contract.methods.isPatientPresent(to).call();
  if (tmp1 && tmp2) {
    await contract.methods.addMedicalReport(to, hivTest, tbTest, bpTest, malTest, comments).send({ from: from, gas: 1000000 });
  }
  return tmp1 && tmp2;
}

export async function addMedicalCertificate(from, to, medProbs, curMed, phyDis, menCond, comments) {
  const contract = getContract();
  const tmp1 = await contract.methods.isDoctorPresent(from).call();
  const tmp2 = await contract.methods.isPatientPresent(to).call();
  if (tmp1 && tmp2) {
    await contract.methods.addMedicalCertificate(to, medProbs, curMed, phyDis, menCond, comments).send({ from: from, gas: 1000000 });
  }
  return tmp1 && tmp2;
}

export async function getDoctor(address) {
  const contract = getContract();
  const data = await contract.methods.getDoctor(address).call();
  return data;
}

export async function getMedReportsPrescriptions(_doctor) {
  const contract = getContract();
  const c = await contract.methods.getCountOfPres(_doctor).call();
  var data = ["Patient, Prescribed Medicines, Medicine Usage, Comments"]
  for (var i = 0; i < c; i++) {
    const id = await contract.methods.getPresId(_doctor, i).call();
    const tmp = await contract.methods.getPrescription(id).call();
    data = data.concat(tmp[1] + tmp[2] + tmp[3] + tmp[4]);
  }
  return data;
}

export async function getPrescriptions(_patient) {
  const contract = getContract();
  const c = await contract.methods.getCountOfPresP(_patient).call();
  var data = ["Doctor, Prescribed Medicines, Medicine Usage, Comments"]
  for (var i = 0; i < c; i++) {
    const id = await contract.methods.getPresIdP(_patient, i).call();
    const tmp = await contract.methods.getPrescription(id).call();
    data = data.concat(tmp[0] + tmp[2] + tmp[3] + tmp[4]);
  }
  return data;
}
