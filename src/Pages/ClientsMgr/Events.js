import {
  GetFormValuesForSqlInsert,
  GetFormValuesForSqlUpdate,
  GetFormRef,
} from "../../Hooks/formManipulator";
import Swal from "sweetalert2";

const addClient = () => {
  localStorage.setItem("tableDisabled", "true");
  localStorage.setItem("mode", "add-cancel");
  localStorage.setItem("selectedLine", "\t\t\t\t\t\t\t\t\t\t");
  window.dispatchEvent(new Event("storage"));
  localStorage.setItem("readOnly", false);
  window.dispatchEvent(new Event("storage"));
};

const editClient = () => {
  if (
    localStorage.selectedLine &&
    localStorage.selectedLine.split("\t").length > 1
  ) {
    localStorage.setItem("tableDisabled", "true");
    // localStorage.setItem("readOnly", localStorage.getItem("readOnly")=="true"?false:true)
    localStorage.setItem("readOnly", false);
    localStorage.setItem("mode", "save-cancel");
    window.dispatchEvent(new Event("storage"));
  } else {
    Swal.fire({
      icon: "error",
      title: "error",
      html: "Oops! Please firstly select a record to edit",
    });
  }
};

const cancelOperation = () => {
  localStorage.setItem("tableDisabled", "false");
  localStorage.setItem("readOnly", true);
  localStorage.setItem("mode", "default");
  window.dispatchEvent(new Event("storage"));
};

const confirmEditClient = async () => {
  let pageName = window.location.pathname.split("/")[1];
  let params = GetFormValuesForSqlUpdate();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var bodyData = JSON.stringify({
    codeClient: params.finalResult[0],
    fname: params.finalResult[1],
    lname: params.finalResult[2],
    phone: params.finalResult[3],
    email: params.finalResult[4],
    address: params.finalResult[5],
    taxNumber: params.finalResult[6],
    postalCode: params.finalResult[7],
    fax: params.finalResult[8],
    observations: params.finalResult[9],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/editClients`,
      requestOptions
    );
    let res = await response.json();
    if (res.success) {
      localStorage.setItem("readOnly", true);
      localStorage.setItem("tableDisabled", false);
      localStorage.setItem("mode", "default");
      window.dispatchEvent(new Event("storage"));
      // // refresh table from database
      // let tempVal = localStorage.offset;
      // localStorage.setItem("offset","0");
      // window.dispatchEvent( new Event('storage') )
      // localStorage.setItem("offset",tempVal);
      // window.dispatchEvent( new Event('storage') )
      // // end refresh table
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "The client has been edited successfully!!",
      });

      localStorage.setItem("selectedLine", undefined);
      window.dispatchEvent(new Event("storage"));
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        html:
          "Oops! Could't edit this client.<br>Error Messasge:<br><strong>" +
          res.error +
          "</strong>",
      });
    }

    localStorage.setItem("readOnly", true);
    localStorage.setItem("mode", "default");
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    unknownError();
  }
};

const confirmAddClient = async () => {
  let pageName = window.location.pathname.split("/")[1];
  let params = GetFormValuesForSqlInsert();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var bodyData = JSON.stringify({
    codeClient: params[0],
    fname: params[1],
    lname: params[2],
    phone: params[3],
    email: params[4],
    address: params[5],
    taxNumber: params[6],
    postalCode: params[7],
    fax: params[8],
    observations: params[9],
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: bodyData,
    redirect: "follow",
  };
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API_URL}/addClients`,
      requestOptions
    );
    let res = await response.json();
    if (res.success) {
      localStorage.setItem("readOnly", true);
      localStorage.setItem("tableDisabled", false);
      localStorage.setItem("mode", "default");
      window.dispatchEvent(new Event("storage"));
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Great! a new client has been added",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "error",
        html:
          "Oops! Could't create a new client.<br>Error Messasge:<br><strong>" +
          res.error +
          "</strong>",
      });
    }
  } catch (e) {
    unknownError();
  }
};

const deleteClient = async () => {
  let pageName = window.location.pathname.split("/")[1];
  if (
    !(
      localStorage.selectedLine &&
      localStorage.selectedLine.split("\t").length > 1
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "error",
      html: "Oops! Please firstly select a record to delete it",
    });
    return;
  }
  let ref = GetFormRef();
  var bodyData = JSON.stringify({
    codeClient: ref,
  });
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let response = await fetch(
          `${process.env.REACT_APP_API_URL}/deleteClients`,
          {
            method: "DELETE",
            headers: myHeaders,
            body: bodyData,
            redirect: "follow",
          }
        );
        let res = await response.json();
        if (res.success) {
          localStorage.setItem("readOnly", true);
          localStorage.setItem("tableDisabled", false);
          localStorage.setItem("mode", "default");
          window.dispatchEvent(new Event("storage"));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "error",
            html:
              "Oops! Could't delete this client.<br>Error Messasge:<br><strong>" +
              res.error +
              "</strong>",
          });
        }
      }
    });
  } catch (e) {
    unknownError();
  }
};

const unknownError = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: '<a href="">Why do I have this issue?</a>',
  });
};

export {
  addClient,
  editClient,
  deleteClient,
  confirmEditClient,
  confirmAddClient,
  cancelOperation,
};
