import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import {
  scorePassword,
  validPasswordVariation,
} from "../utils/PasswordValidations";
import * as authActions from "../store/actions/auth";

const fieldsValidationSchema = yup.object().shape({
  showName: yup.boolean(),
  name: yup.string().when("showName", {
    is: true,
    then: yup.string().required("O nome não pode ser vazio"),
  }),
  showUser: yup.boolean(),
  user: yup.string().when("showUser", {
    is: true,
    then: yup.string().required("O usuário não pode ser vazio"),
  }),
  email: yup
    .string()
    .email("O email deve ser valido")
    .required("O e-mail não pode ser vazio")
    .nullable(),
  password: yup
    .string()
    .required("A senha não pode ser vazia")
    .min(8, "A senha deve conter pelo menos 8 caracteres")
    .max(12, "A senha deve conter no máximo 12 caracteres")
    .nullable(),
});

const AuthScreen = (props) => {
  const { register, setValue, handleSubmit } = useForm({
    validationSchema: fieldsValidationSchema,
  });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [offset, setOffset] = useState(20);
  const [score, setScore] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    register("name");
    register("user");
    register("email");
    register("password");
  }, [register]);

  const onSubmit = async (data) => {
    console.log("onSubmit");

    await fieldsValidationSchema
      .validate(data, { abortEarly: false })
      .then(async () => {
        try {
          if (isSignup) {
            const { email, password, name, user } = data;
            await dispatch(authActions.signup(email, password, name, user));
          } else {
            const { email, password } = data;
            await dispatch(authActions.signin(email, password));
          }
        } catch (error) {
          console.log(`error: ${error}`);
          setError({ message: error.message });
        }
      })
      .catch((err) => {
        const validationErrors = {};

        if (err instanceof yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
        }

        setError(validationErrors);
      });
  };

  const handleSignup = () => {
    setIsSignup(!isSignup);
    setValue("showName", !isSignup);
    setValue("showUser", !isSignup);
  };

  const passwordResetHandler = () => {
    console.log("resetPassword");
    props.navigation.navigate("ForgotPassword");
  };

  const setPasswordText = (password) => {
    setPassword(password);
    setValue("password", password);
    const { score, variations } = scorePassword(password);
    setScore(score);

    if (isSignup && password.length >= 8) {
      const variationValidation = validPasswordVariation(variations);
      setError({ passwordValidation: variationValidation });
      // console.log(`variations: ${JSON.stringify(variationValidation)}`);
      // console.log(`score: ${score}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={offset}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            {isSignup && (
              <View>
                <View style={styles.inputContainer}>
                  <CustomText>Nome</CustomText>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nome"
                    onChangeText={(text) => setValue("name", text)}
                    onTouchStart={() => {
                      setOffset(-100);
                    }}
                  />
                  {error && error.name && (
                    <CustomText style={styles.errorMessage}>
                      {" "}
                      {error.name}
                    </CustomText>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <CustomText>Usuario</CustomText>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Usuário"
                    onChangeText={(text) => setValue("user", text)}
                    onTouchStart={() => {
                      setOffset(-50);
                    }}
                  />
                  {error && error.user && (
                    <CustomText style={styles.errorMessage}>
                      {" "}
                      {error.user}
                    </CustomText>
                  )}
                </View>
              </View>
            )}

            <View style={styles.inputContainer}>
              <CustomText>E-Mail</CustomText>
              <TextInput
                style={styles.textInput}
                placeholder="email@email"
                keyboardType="email-address"
                onChangeText={(text) => setValue("email", text)}
                onTouchStart={() => {
                  setOffset(0);
                }}
              />
              {error && error.email && (
                <CustomText style={styles.errorMessage}>
                  {" "}
                  {error.email}
                </CustomText>
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <CustomText style={{ marginLeft: 15 }}>Senha</CustomText>

              <View style={{ ...styles.searchBox }}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="senha"
                  autoFocus={true}
                  secureTextEntry={!isPasswordVisible}
                  maxLength={12}
                  onChangeText={(text) => setPasswordText(text)}
                  onTouchStart={() => {
                    setOffset(50);
                  }}
                />

                <Ionicons
                  name={!isPasswordVisible ? "eye" : "eye-off"}
                  color={Colors.primaryTextColor}
                  size={23}
                  style={{ marginRight: 5 }}
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                />
              </View>

              {isSignup && (
                <BarPasswordStrengthDisplay
                  password={password}
                  minLength={5}
                  style={{ marginVertical: 5 }}
                  labelVisible={false}
                  scoreLimit={100}
                />
              )}

              <View style={{ marginLeft: 10, marginBottom: 10 }}>
                {error && error.password && (
                  <CustomText style={styles.errorMessage}>
                    {" "}
                    {error.password}
                  </CustomText>
                )}
                {error && error.message && (
                  <CustomText style={styles.errorMessage}>
                    {" "}
                    {error.message}
                  </CustomText>
                )}
                {error &&
                  error.passwordValidation &&
                  error.passwordValidation.map((error) => {
                    return (
                      <CustomText style={styles.errorMessage} key={error}>
                        {error}
                      </CustomText>
                    );
                  })}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  color={Colors.primaryColor}
                  title={isSignup ? "Salvar" : "Entrar"}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color={Colors.primaryColor}
                  title={isSignup ? "login" : "cadastrar-se"}
                  onPress={() => handleSignup()}
                />
              </View>
            </View>

            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  passwordResetHandler();
                }}
              >
                <CustomText
                  style={{
                    color: Colors.primaryColor,
                  }}
                >
                  Esqueceu a senha?
                </CustomText>
              </TouchableOpacity>
            </View>

            {/* adicionado para corrigir o problema do prenchimento do cadastro*/}
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export const authScreenOptions = (navData) => {
  return {
    headerTitle: "Autenticação",
  };
};

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: Colors.primaryColorLight,
    borderBottomColor: Colors.primaryColorDark,
    borderBottomWidth: 1,
  },
  button: {
    marginRight: 10,
    width: 130,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
  },
  errorMessage: {
    color: Colors.accentColor,
    fontSize: 12,
  },
  searchBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.primaryColorDark,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: Colors.primaryColorLight,
  },
  inputStyle: {
    marginRight: 10,
    flex: 1,
  },
});

export default AuthScreen;

// <View style={styles.inputContainer}>
// <CustomText>Senha</CustomText>
// <TextInput
//   style={styles.textInput}
//   placeholder="senha"
//   maxLength={12}
//   onChangeText={(text) => setValue("password", text)}
//   secureTextEntry={true}
// />
// {error && error.password && (
//   <CustomText style={styles.errorMessage}> {error.password}</CustomText>
// )}
// {error && error.message && (
//   <CustomText style={styles.errorMessage}> {error.message}</CustomText>
// )}
// </View>
