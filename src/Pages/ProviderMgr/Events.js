import {
  GetFormValuesForSqlInsert,
  GetFormValuesForSqlUpdate,
  GetFormRef,
} from "../../Hooks/formManipulator";
import Swal from "sweetalert2";

const addProviders = () => {
  localStorage.setItem("tableDisabled", "true");
  localStorage.setItem("mode", "add-cancel");
  localStorage.setItem("selectedLine", "\t\t\t\t\t\t\t\t\t\t");
  window.dispatchEvent(new Event("storage"));
  localStorage.setItem("readOnly", false);
  window.dispatchEvent(new Event("storage"));
};

const editProviders = () => {
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

const confirmEditProviders = async () => {
  let pageName = window.location.pathname.split("/")[1];
  let params = GetFormValuesForSqlUpdate();
  try {
    let response = await fetch(
      `http://erp2290.xilyor.com//API/edit_${pageName}_mgr.php?ref=${params.ref}&params=${params.finalResult}`,
      {
        method: "GET",
      }
    );
    let res = await response.json();
    if (res.affectedRows == 1 && res.success) {
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

const confirmAddProviders = async () => {
  let pageName = window.location.pathname.split("/")[1];
  let params = GetFormValuesForSqlInsert();
  try {
    let response = await fetch(
      `http://erp2290.xilyor.com/API/add_${pageName}_mgr.php?values=${params}`,
      {
        method: "GET",
      }
    );
    let res = await response.json();
    if (res.affectedRows == 1 && res.success) {
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

const deleteProviders = async () => {
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
        let response = await fetch(
          `http://erp2290.xilyor.com/API/delete_${pageName}_mgr.php?ref=${ref}`,
          {
            method: "GET",
          }
        );
        let res = await response.json();
        if (res.affectedRows == 1 && res.success) {
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
  addProviders,
  editProviders,
  deleteProviders,
  confirmEditProviders,
  confirmAddProviders,
  cancelOperation,
};
