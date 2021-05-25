import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as yup from "yup";
import * as authActions from "../store/actions/auth";

import CustomText from "../components/CustomText";
import CustomHeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

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
    .min(6, "A senha deve conter pelo menos 6 dígitos")
    .nullable(),
});

const AuthScreen = (props) => {
  const { register, setValue, handleSubmit } = useForm({
    validationSchema: fieldsValidationSchema,
  });
  const [isSignup, setIsSignup] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    register("name");
    register("user");
    register("email");
    register("password");
  }, [register]);

  const onSubmit = async (data) => {
    let action;
    const { email, password } = data;

    await fieldsValidationSchema
      .validate(data)
      .then(() => {
        setError();
        setCanSubmit(true);
      })
      .catch((err) => {
        const validationErrors = {};
        validationErrors[err.path] = err.message;
        setError(validationErrors);
        setCanSubmit(false);
      });

    if (canSubmit) {
      if (isSignup) {
        action = authActions.signup(email, password);
      } else {
        action = authActions.signin(email, password);
      }
    }

    try {
      await dispatch(action);
    } catch (error) {
      console.log(error);
      setError({ message: error.message });
    }
  };

  const handleSignup = () => {
    setIsSignup(!isSignup);
    setValue("showName", !isSignup);
    setValue("showUser", !isSignup);
  };

  return (
    <View>
      {isSignup && (
        <View>
          <View style={styles.inputContainer}>
            <CustomText>Nome</CustomText>
            <TextInput
              style={styles.textInput}
              placeholder="Nome"
              onChangeText={(text) => setValue("name", text)}
            />
            {error && error.name && (
              <CustomText style={styles.errorMessage}> {error.name}</CustomText>
            )}
          </View>

          <View style={styles.inputContainer}>
            <CustomText>Usuario</CustomText>
            <TextInput
              style={styles.textInput}
              placeholder="Usuário"
              onChangeText={(text) => setValue("user", text)}
            />
            {error && error.user && (
              <CustomText style={styles.errorMessage}> {error.user}</CustomText>
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
        />
        {error && error.email && (
          <CustomText style={styles.errorMessage}> {error.email}</CustomText>
        )}
      </View>

      <View style={styles.inputContainer}>
        <CustomText>Senha</CustomText>
        <TextInput
          style={styles.textInput}
          placeholder="senha"
          maxLength={12}
          onChangeText={(text) => setValue("password", text)}
        />
        {error && error.password && (
          <CustomText style={styles.errorMessage}> {error.password}</CustomText>
        )}
        {error && error.message && (
          <CustomText style={styles.errorMessage}> {error.message}</CustomText>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.button}>
          <Button
            title="Cadastre-se"
            onPress={() => handleSignup()}
            disabled={true}
          />
        </View>
      </View>
    </View>
  );
};

export const authScreenOptions = (navData) => {
  return {
    headerTitle: "Autenticação",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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

export default AuthScreen;
