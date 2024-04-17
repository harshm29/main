import axios, { AxiosInstance } from "axios";
// import { ProcessPayloadType } from "../types/user";
//import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AdminService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 3000,
      timeoutErrorMessage: "Time out!",
    });
  }

  patients = (patient: any) => {
    return this.instance
      .post(`/patients`, {
        patient,
      })
      .then((res) => {
        console.log("hjhgj", res);
        if (res?.status === 200) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
            data: res?.data?.data,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  doctors = (doctor: any, status?: any, blockStatus?: any) => {
    return this.instance
      .post(`/docotors`, {
        doctor,
      })
      .then((res) => {
        if (res?.status === 200) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
            data: res?.data?.data,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  login = (email: string, password: string, type: string) => {
    return this.instance
      .post("/adminlogin", {
        email,
        password,
        type,
      })
      .then((res: any) => {
        if (res?.status === 200) {
          return {
            status: res?.status,
            patientCount: res?.data?.patientCount,
            doctorCount: res?.data?.doctorCount,
            message: res?.data?.message,
            accessToken: res?.data?.token,
            email: res?.data?.email,
            _id: res?.data?._id,

            user: res.data.userDetails,
            username: res.data.userDetails.name,
            id: res.data.userDetails._id,
            type: res.data.userDetails.type,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  InviteUser = (name: string, email: string) => {
    console.log("------->name", name, "---------->", email);
    return this.instance
      .post("/doctorsInvitation", {
        email,
        name,
      })
      .then((res: any) => {
        if (res?.status === 200) {
          console.log("=========0000>", res);
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  getUserInfoAdmin = (pid: any) => {
    console.log(
      "111111111111111111111111111111111111111111111111111111111111111",
      pid
    );
    return this.instance
      .post(`/getUserInfoAdmin`, {
        pid,
      })
      .then((res: any) => {
        console.log("respat=====>", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  getAdminSettings = (id: any) => {
    console.log(
      "111111111111111111111111111111111111111111111111111111111111111",
      id
    );
    return this.instance
      .post("/GetAdminSettings", {
        id,
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", res);
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  updateAdminSettings = (
    id: any,
    long_consultation: any,
    short_consultation: any,
    hold_consultation_charge: any,
    doctor_commission_SC: any,
    doctor_commission_LC: any,
    waiver_percentage: any,
    waiver_admin_commission: any,
    start_operational_time: any,
    end_operational_time: any,
    doctor_commission_type: any
  ) => {
    return this.instance
      .post("/UpdateAdminSettings", {
        id,
        long_consultation,
        short_consultation,
        hold_consultation_charge,
        doctor_commission_SC,
        doctor_commission_LC,
        waiver_percentage,
        waiver_admin_commission,
        start_operational_time,
        end_operational_time,
        doctor_commission_type,
      })
      .then((res) => {
        console.log("respat=====>", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  AdminChangePassword = (
    id: any,
    oldPassword: any,
    newPassword: any,
    confirmPassword: any
  ) => {
    return this.instance
      .post("/AdminChangePassword", {
        id,
        newPassword,
        confirmPassword,
        oldPassword,
      })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  UpdateProfile = (id: any, name: any, email: any) => {
    return this.instance
      .post("/updateProfile", {
        id,
        name,
        email,
      })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  patientRecords = (pid: any) => {
    return this.instance.post(`/patientRecord/${pid}`).then((res) => {
      console.log("change ka response", res.data);
      if (res?.status === 200) {
        return {
          status: res?.status,
          data: res?.data,
          message: res?.data?.message,
        };
      } else {
        return {
          status: res?.status,
          message: res?.data?.message,
        };
      }
    });
  };

  patientConsultation = (pid: any) => {
    return this.instance.post(`/patientHistory/${pid}`).then((res) => {
      console.log("change ka response", res.data);
      if (res?.status === 200) {
        return {
          status: res?.status,
          data: res?.data,
          message: res?.data?.message,
        };
      } else {
        return {
          status: res?.status,
          message: res?.data?.message,
        };
      }
    });
  };

  getMedicationRecords = (requestData: any) => {
    return this.instance
      .get(`/file/list`, {
        ...requestData,
      })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  getTemplateRecords = (search?: any) => {
    return this.instance
      .post(`/file/getTemplateList`, { ...search })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  deleteMedicationRecord = (medicationId: any) => {
    return this.instance
      .post(`/deleteMedication`, {
        medicationId,
      })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  deleteTemplateRecord = (templateId: any) => {
    return this.instance
      .post(`/file/deleteTemplate`, {
        templateId,
      })
      .then((res) => {
        console.log("change ka response", res.data);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  addMedication = (formData: any) => {
    console.log(formData);
    return this.instance
      .post("/addMedication", {
        ...formData,
      })
      .then((res: any) => {
        console.log("ssssssssssssssssssss", res);

        if (res?.status === 200) {
          return res;
        } else {
          return "res";
        }
      });
  };

  addTemplate = (formData: any) => {
    console.log("Slug payload ************", formData);
    return this.instance
      .post("/file/create-drugcategory", {
        ...formData,
      })
      .then((res: any) => {
        console.log("ssssssssssssssssssss", res);

        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  updateMedication = (formData: any) => {
    console.log("formData", formData);
    return this.instance
      .post("/file/update-drugcategory", {
        ...formData,
      })
      .then((res: any) => {
        console.log("ssssssssssssssssssss", res);
        if (res?.status === 200) {
          return {
            status: res?.status,
            data: res?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.status,
            message: res?.data?.message,
          };
        }
      });
  };

  updatedrugCategory = (formData: any) => {
    console.log(formData);
    return this.instance
      .post("/file/updatedrugCategory", {
        ...formData,
      })
      .then((res: any) => {
        console.log("ssssssssssssssssssss", res);

        if (res?.status === 200) {
          return res;
        } else {
          return "res";
        }
      });
  };
}
