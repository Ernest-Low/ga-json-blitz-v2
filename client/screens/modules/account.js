import $ from "jquery";
import axios from "axios";

import current_entities from "../entities";

import x_button from "/assets/ui/cancel.png";
import ok_button from "/assets/ui/accept.png";
import skull_black_frame from "/assets/ui/skull_black_frame.png";

const $account = () => {
  let current_window = "login";

  const $window = $("<div>")
    .attr("id", "account_window")
    .css({
      position: "absolute",
      margin: "0 auto",
      top: "5%",
      height: "68%",
      width: "50%",
      "background-image": `url("${skull_black_frame}")`,
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
      "z-index": 3,
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    });

  //!
  //! Login code chunk
  //!
  const $login = $("<div>").attr("id", "login_window").css({
    position: "absolute",
    height: "60%",
    width: "75%",
    left: "11.5%",
    top: "30%",
    // display: "flex",
    // "flex-direction": "column",
    // "align-items": "center",
  });

  //* Top text for Registration
  const $login_text = $("<h2>")
    .attr("id", "login_text")
    .css({
      color: "white",
      "font-size": "2vw",
      "font-family": "Alagard",
      "text-align": "center",
    })
    .text("LOGIN");

  //  Inputfield for name in registration
  const $login_inputname = $("<input>")
    .attr({
      type: "text",
      id: "input_login_name",
      placeholder: "Username",
      value: "",
    })
    .css({
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "50%",
      height: "60%",
      "font-family": "Alagard",
      border: "none",
    });

  //  Label for name in registration
  const $login_name = $("<div>")
    .attr("id", "login_name")
    .css({
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      height: "20%",
      width: "100%",
    })
    .append(
      $("<h3>")
        .css({
          color: "white",
          "font-size": "1.5vw",
          "font-family": "Alagard",
          margin: "0 1vw 0 0",
        })
        .text("Username: "),
      $login_inputname
    );

  //  Inputfield for password in registration
  const $login_inputpassword = $("<input>")
    .attr({
      type: "password",
      id: "input_login_password",
      placeholder: "Password",
      value: "",
    })
    .css({
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "50%",
      height: "60%",
      "font-family": "Alagard",
      border: "none",
    });

  //  Label for name in registration
  const $login_password = $("<div>")
    .attr("id", "login_password")
    .css({
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      height: "20%",
      width: "100%",
    })
    .append(
      $("<h3>")
        .css({
          color: "white",
          "font-size": "1.5vw",
          "font-family": "Alagard",
          margin: "0 1vw 0 0",
        })
        .text("Password: "),
      $login_inputpassword
    );

  //!
  //! Register Chunk
  //!
  const $register = $("<div>").attr("id", "register_window").css({
    position: "absolute",
    height: "60%",
    width: "75%",
    left: "11.5%",
    top: "30%",
    // display: "flex",
    // "flex-direction": "column",
    // "align-items": "center",
  });

  //* Top text for Registration
  const $register_text = $("<h2>")
    .attr("id", "register_text")
    .css({
      color: "white",
      "font-size": "2vw",
      "font-family": "Alagard",
      "text-align": "center",
    })
    .text("REGISTER");

  //  Inputfield for name in registration
  const $register_inputname = $("<input>")
    .attr({
      type: "text",
      id: "input_register_name",
      placeholder: "Username",
      value: "",
    })
    .css({
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "50%",
      height: "60%",
      "font-family": "Alagard",
      border: "none",
    });

  //  Label for name in registration
  const $register_name = $("<div>")
    .attr("id", "register_name")
    .css({
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      height: "20%",
      width: "100%",
    })
    .append(
      $("<h3>")
        .css({
          color: "white",
          "font-size": "1.5vw",
          "font-family": "Alagard",
          margin: "0 1vw 0 0",
        })
        .text("Username: "),
      $register_inputname
    );

  //  Inputfield for password in registration
  const $register_inputpassword = $("<input>")
    .attr({
      type: "password",
      id: "input_register_password",
      placeholder: "Password",
      value: "",
    })
    .css({
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "50%",
      height: "60%",
      "font-family": "Alagard",
      border: "none",
    });

  //  Label for password in registration
  const $register_password = $("<div>")
    .attr("id", "register_password")
    .css({
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      height: "20%",
      width: "100%",
    })
    .append(
      $("<h3>")
        .css({
          color: "white",
          "font-size": "1.5vw",
          "font-family": "Alagard",
          margin: "0 1vw 0 0",
        })
        .text("Password: "),
      $register_inputpassword
    );

  //  Inputfield for confirm password in registration
  const $register_inputconfirmpassword = $("<input>")
    .attr({
      type: "password",
      id: "input_register_confirmpassword",
      placeholder: "Password",
      value: "",
    })
    .css({
      color: "white",
      "background-color": "rgba(0,0,0,0.8)",
      "font-size": "1.5vw",
      width: "50%",
      height: "60%",
      "font-family": "Alagard",
      border: "none",
    });

  //  Label for confirm password in registration
  const $register_confirmpassword = $("<div>")
    .attr("id", "register_confirmpassword")
    .css({
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      height: "20%",
      width: "100%",
    })
    .append(
      $("<h3>")
        .css({
          color: "white",
          "font-size": "1.5vw",
          "font-family": "Alagard",
          margin: "0 1vw 0 0",
        })
        .text("Confirm Password: "),
      $register_inputconfirmpassword
    );

  //* Okay Button
  const $okaybutton = $("<div>")
    .addClass("divbutton")
    .css({
      height: "75%",
      width: "10%",
      "background-image": `url("${ok_button}")`,
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
    })
    .append(
      $("<button>")
        .addClass("actionbutton")
        .css({
          "border-radius": "999rem",
          width: "100%",
          height: "100%",
          color: "ghostwhite",
          "background-color": "rgba(255,255,255,0)",
          "font-size": "1.5vw",
          "text-align": "center",
          border: "none",
          "font-family": "Alagard",
        })
        .on("click", async () => {
          if (current_window == "login") {
            console.log("Login ok pressed");
            const name_input = $login_inputname.val().trim();
            const pass_input = $login_inputpassword.val();
            if (name_input == "") {
              $login_text.text("Username cannot be blank");
            } else {
              if (pass_input == "") {
                $login_text.text("Password cannot be blank");
              } else {
                try {
                  const response = await axios.post("/api/login", {
                    username: name_input,
                    password: pass_input,
                  });
                  console.log(response.data);
                } catch (err) {
                  console.log("Error here");
                  if (!err.response) {
                    $login_text.text("No Server Response");
                  } else if (err.response?.status === 400) {
                    $login_text.text("Missing Username or Password");
                  } else if (err.response?.status === 401) {
                    $login_text.text("Unauthorized");
                  } else {
                    $login_text.text("Login Failed");
                  }
                }
              }
            }
          } else {
            console.log("Register ok pressed");
            const name_input = $register_inputname.val().trim();
            const pass_input = $register_inputpassword.val();
            const confirmpass_input = $register_inputconfirmpassword.val();
            if (name_input == "") {
              $register_text.text("Username cannot be blank");
            } else {
              if (pass_input.length < 8) {
                $register_text.text("Password not long enough");
              } else {
                if (pass_input !== confirmpass_input) {
                  $register_text.text("Passwords do not match");
                } else {
                  console.log("Name:" + name_input);
                  console.log("Pass:" + pass_input);
                }
              }
            }
          }
        })
    );

  //* Close Button
  const $closebutton = $("<div>")
    .addClass("divbutton")
    .css({
      height: "75%",
      width: "10%",
      "background-image": `url("${x_button}")`,
      "background-size": "100% 100%",
      "background-repeat": "no-repeat",
      "object-fit": "fill",
    })
    .append(
      $("<button>")
        .addClass("actionbutton")
        .css({
          "border-radius": "999rem",
          width: "100%",
          height: "100%",
          color: "ghostwhite",
          "background-color": "rgba(255,255,255,0)",
          "font-size": "1.5vw",
          "text-align": "center",
          border: "none",
          "font-family": "Alagard",
        })
        .on("click", () => {
          console.log("X clicked");
          current_entities.account_window = false;
          $("#account_window").remove();
        })
    );

  //* Button Container
  const $account_btncontainer = $("<div>")
    .attr("id", "account_btncontainer")
    .css({
      position: "absolute",
      display: "flex",
      "flex-direction": "row",
      "justify-content": "center",
      "align-items": "center",
      bottom: "0.5vw",
      gap: "20%",
      height: "18%",
      width: "100%",
    })
    .append($okaybutton, $closebutton);

  //* Bottom text of login to swap to registration
  const $swap_regist = $("<h2>")
    .attr("id", "swap_regist")
    .css({
      color: "white",
      "font-size": "1.3vw",
      "font-family": "Alagard",
      "text-align": "center",
      "text-decoration": "underline",
      cursor: "pointer",
    })
    .text("Need an account? Register here.")
    .on("click", () => {
      console.log("Clicked, swap to register");
      current_window = "register";
      $login.remove();
      $register.append(
        $register_text,
        $register_name,
        $register_password,
        $register_confirmpassword
      );
      $window.prepend($register);
    });

  $login.append($login_text, $login_name, $login_password, $swap_regist);
  $window.append($login, $account_btncontainer);
  $("#mainscreen").append($window);
  // $("#account_window").append($("#register_window"));
};

export default $account;
