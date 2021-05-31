import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { StyleSheet, View } from "react-native";
import CustomText from "../components/CustomText";
import Colors from "../constants/Colors";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import * as authActions from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const fieldsValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("O email deve ser valido")
    .required("O e-mail não pode ser vazio")
    .nullable(),
});

const ForgotPasswordScreen = (props) => {
  const { register, setValue, handleSubmit } = useForm({
    validationSchema: fieldsValidationSchema,
  });
  const emailWasSend = useSelector((state) => state.auth.email);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    register("email");
  }, [register]);

  const onSubmit = async (data) => {
    await fieldsValidationSchema
      .validate(data)
      .then(async () => {
        try {
          const { email } = data;
          await dispatch(authActions.resetPassword(email));
        } catch (err) {
          const { message } = err;
          console.log(`error Message: ${message}`);
          setError(message);
        }
      })
      .catch((err) => {
        const validationErrors = {};
        validationErrors[err.path] = err.message;
        setError(validationErrors);
        console.log(`errors: ${JSON.stringify(validationErrors)}`);
      });
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <CustomText>
          Informe abaixo o e-mail para redefinir a sua senha
        </CustomText>

        <TextInput
          style={styles.textInput}
          placeholder="email@email"
          keyboardType="email-address"
          onChangeText={(text) => setValue("email", text)}
        />

        {error && error.email && (
          <CustomText style={styles.errorMessage}> {error.email}</CustomText>
        )}

        {emailWasSend && (
          <CustomText style={{ ...styles.errorMessage, fontSize: 13 }}>
            E-mail enviado com sucesso para o endereço{" "}
            <CustomText
              style={{
                ...styles.errorMessage,
                fontFamily: "roboto-bold",
                fontSize: 13,
              }}
            >
              {emailWasSend}
            </CustomText>
          </CustomText>
        )}

        {error && <CustomText style={styles.errorMessage}> {error}</CustomText>}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            color={Colors.primaryColor}
            title="Enviar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export const forgotPasswordScreenOptions = (navData) => {
  return {
    headerTitle: "Redefinir senha",
  };
};

const styles = StyleSheet.create({
  inputContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    padding: 5,
  },
  textInput: {
    backgroundColor: Colors.primaryColorLight,
    borderBottomColor: Colors.primaryColorDark,
    borderBottomWidth: 1,
  },
  button: {
    marginRight: 10,
    width: 110,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
  },
  errorMessage: {
    color: Colors.primaryColorDark,
    fontSize: 12,
  },
});
export default ForgotPasswordScreen;
