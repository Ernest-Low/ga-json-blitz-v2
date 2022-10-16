import $ from "jquery";
import axios from "axios";

import current_entities from "../entities";
import mainScreen from "../mainscreen";

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

  //! Login on click functions
  const login_func = async () => {
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
          if (response.data.status == 200) {
            console.log("Login Success");
            console.log(response.data.payload);
            const localuser = {
              user: {
                username: name_input,
                accessToken: response.data.payload.accessToken,
                id: response.data.payload.id,
              },
            };
            localStorage.setItem("user", JSON.stringify(localuser));
            current_entities.account_window = false;
            current_entities.username = name_input;
            $("#account_window").remove();
            $("#mainscreen").remove();
            mainScreen();
          } else {
            console.log("Login Failed");
            $login_text.text(response.data.payload);
          }
        } catch (err) {
          console.log("Login Failed");
          $login_text.text(err.response.data.payload);
        }
      }
    }
  };

  //! Register on click functions
  const register_func = async () => {
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
          try {
            const response = await axios.post("/api/register", {
              username: name_input,
              password: pass_input,
            });
            if (response.data.status == 201) {
              console.log("Registration Success");
              $("#account_window").remove();
              $account();
              $login_text.text("Registration Success");
            } else {
              console.log("Registration Failed");
              $register_text.text(response.data.payload);
            }
          } catch (err) {
            console.log("Registration Failed");
            $register_text.text(err.response.data.payload);
          }
        }
      }
    }
  };

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
          cursor: "pointer",
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
            login_func();
          } else {
            console.log("Register ok pressed");
            register_func();
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
          cursor: "pointer",
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

  $(document).off();
  $(document).on("keydown", (e) => {
    if (e.key == "Escape" && current_entities.account_window == true) {
      console.log("Remove register/login window");
      $("#account_window").remove();
      current_entities.account_window = false;
    } else if (e.key == "Enter" && current_entities.account_window == true) {
      if (current_window == "login") {
        console.log("Login Enter pressed");
        login_func();
      } else {
        console.log("Register Enter pressed");
        register_func();
      }
    }
  });
  $login.append($login_text, $login_name, $login_password, $swap_regist);
  $window.append($login, $account_btncontainer);
  $("#mainscreen").append($window);
  // $("#account_window").append($("#register_window"));
};

export default $account;
