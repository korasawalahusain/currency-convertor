import { countries } from "../constants";
import { Text, View } from "react-native";
import { Svg, Path } from "react-native-svg";
import { CurrencyInput } from "../components";
import { historyState } from "../atoms/history";
import React, { useState, useEffect } from "react";
import { BaseButton } from "react-native-gesture-handler";
import { useRecoilState, useSetRecoilState } from "recoil";
import { conversionRates } from "../atoms/conversionRates";

export default function ConvertorScreen({ navigation }) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [conversionRateState, setConversionRateState] =
    useRecoilState(conversionRates);
  const setHistoryState = useSetRecoilState(historyState);

  const [toCurrency, setToCurrency] = useState(countries[1]);
  const [fromCurrency, setFromCurrency] = useState(countries[0]);
  const [conversionRate, setConverstionRate] = useState();
  const [crFetching, setCRFetching] = useState(false);

  const onClickDropDown = (openedFor) => {
    const setData = (data) => {
      if (openedFor === "from") {
        setFromCurrency(data);
      } else {
        setToCurrency(data);
      }
    };

    navigation.navigate("CurrencyList", {
      setData,
    });
  };

  const [focusOn, setFocusOn] = useState("from");

  const okayBtnPress = () => {
    if (to !== "" && from !== "") {
      setHistoryState((prevState) => {
        if (prevState) {
          let state = prevState.find(
            (prevState) =>
              prevState.date === new Date().toISOString().split("T")[0]
          );
          if (state) {
            state = {
              ...state,

              data: [
                ...state.data,
                {
                  id: Math.floor(Math.random() * 1000) + 1,
                  from: fromCurrency,
                  to: toCurrency,
                  fromValue: from,
                  toValue: to,
                },
              ],
            };

            return [
              ...prevState.filter(
                (prevState) =>
                  prevState.date !== new Date().toISOString().split("T")[0]
              ),
              state,
            ];
          } else {
            return [
              ...prevState,
              {
                date: new Date().toISOString().split("T")[0],
                data: [
                  {
                    id: Math.floor(Math.random() * 1000) + 1,
                    from: fromCurrency,
                    to: toCurrency,
                    fromValue: from,
                    toValue: to,
                  },
                ],
              },
            ];
          }
        } else {
          return [
            {
              date: new Date().toISOString().split("T")[0],
              data: [
                {
                  id: Math.floor(Math.random() * 1000) + 1,
                  from: fromCurrency,
                  to: toCurrency,
                  fromValue: from,
                  toValue: to,
                },
              ],
            },
          ];
        }
      });
    }
  };

  useEffect(() => {
    (async () => {
      setFrom("");
      setTo("");
      setCRFetching(true);

      const cacheValue = conversionRateState.find(
        (conversionRate) =>
          conversionRate.from === fromCurrency.currency.code &&
          conversionRate.to === toCurrency.currency.code
      );

      if (cacheValue === undefined) {
        fetch(
          `https://api.exchangerate.host/latest?base=${fromCurrency.currency.code}&symbols=${toCurrency.currency.code}`
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            setCRFetching(false);
            setConverstionRate(response.rates[toCurrency.currency.code]);
            setConversionRateState((prevState) => [
              ...prevState,
              {
                id: "",
                from: fromCurrency.currency.code,
                to: toCurrency.currency.code,
                rate: response.rates[toCurrency.currency.code],
              },
            ]);
          })
          .catch((error) => console.error(error));
      } else {
        setCRFetching(false);
        setConverstionRate(cacheValue.rate);
      }
    })();
  }, [toCurrency, fromCurrency]);

  useEffect(() => {
    if (focusOn === "to") {
      if (to === "") {
        setFrom("");
      } else {
        setFrom((Number(to) / conversionRate).toFixed(3).toString());
      }
    }
  }, [to]);

  useEffect(() => {
    if (focusOn === "from") {
      if (from === "") {
        setTo("");
      } else {
        setTo((Number(from) * conversionRate).toFixed(3).toString());
      }
    }
  }, [from]);

  return (
    <View className="bg-quaternary flex-1">
      <View className="flex-1 px-5">
        <View className="flex flex-row justify-between items-center w-full pt-12">
          <Text className="text-black font-futura_bold text-3xl">Convert</Text>
          <BaseButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-black"
            >
              <Path
                fill-rule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clip-rule="evenodd"
              />
            </Svg>
          </BaseButton>
        </View>

        <View className="w-full h-[325px] flex-col pt-2.5">
          <CurrencyInput
            type="from"
            value={from}
            focusOn={focusOn}
            country={fromCurrency}
            openCurrenyPicker={() => onClickDropDown("from")}
            onFocus={() => setFocusOn("from")}
            conversionRate={
              crFetching ? "refreshing..." : Number(conversionRate).toFixed(3)
            }
          />
          <CurrencyInput
            type="to"
            value={to}
            focusOn={focusOn}
            country={toCurrency}
            onFocus={() => setFocusOn("to")}
            openCurrenyPicker={() => onClickDropDown("to")}
            conversionRate={
              crFetching
                ? "refreshing..."
                : Number(1 / conversionRate).toFixed(3)
            }
          />
        </View>

        <View className="flex flex-row space-x-2">
          <BaseButton
            className="w-4/5 py-5 bg-black mt-3 items-center justify-center"
            onPress={okayBtnPress}
          >
            <Text className="text-quinary font-futura">Okay</Text>
          </BaseButton>
          <BaseButton
            className="flex-1 py-5 bg-black mt-3 items-center justify-center"
            onPress={() => {
              navigation.navigate("Chart", {
                to: toCurrency,
                from: fromCurrency,
              });
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-quinary"
            >
              <Path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </Svg>
          </BaseButton>
        </View>

        <View className="flex-1 mt-4 space-y-1">
          <View className="flex w-full h-[23%] flex-row space-x-1">
            {[1, 2, 3].map((number, index) => (
              <BaseButton
                key={index}
                className="bg-quaternary2 h-full w-[32.6%] items-center justify-center"
                onPress={() => {
                  focusOn === "from"
                    ? setFrom((prevState) => prevState.concat(`${number}`))
                    : focusOn === "to"
                    ? setTo((prevState) => prevState.concat(`${number}`))
                    : null;
                }}
              >
                <Text className="font-futura text-[30px]">{number}</Text>
              </BaseButton>
            ))}
          </View>
          <View className="flex w-full h-[23%] flex-row space-x-1">
            {[4, 5, 6].map((number, index) => (
              <BaseButton
                key={index}
                className="bg-quaternary2 h-full w-[32.6%] items-center justify-center"
                onPress={() => {
                  focusOn === "from"
                    ? setFrom((prevState) => prevState.concat(`${number}`))
                    : focusOn === "to"
                    ? setTo((prevState) => prevState.concat(`${number}`))
                    : null;
                }}
              >
                <Text className="font-futura text-[30px]">{number}</Text>
              </BaseButton>
            ))}
          </View>
          <View className="flex w-full h-[23%] flex-row space-x-1">
            {[7, 8, 9].map((number, index) => (
              <BaseButton
                key={index}
                className="bg-quaternary2 h-full w-[32.6%] items-center justify-center"
                onPress={() => {
                  focusOn === "from"
                    ? setFrom((prevState) => prevState.concat(`${number}`))
                    : focusOn === "to"
                    ? setTo((prevState) => prevState.concat(`${number}`))
                    : null;
                }}
              >
                <Text className="font-futura text-[30px]">{number}</Text>
              </BaseButton>
            ))}
          </View>
          <View className="flex w-full h-[23%] flex-row space-x-1">
            <BaseButton className="bg-quaternary2 h-full w-[32.6%] items-center justify-center">
              <Text className="font-futura text-[30px]">*</Text>
            </BaseButton>
            <BaseButton
              className="bg-quaternary2 h-full w-[32.6%] items-center justify-center"
              onPress={() => {
                focusOn === "from"
                  ? setFrom((prevState) => prevState.concat("0"))
                  : focusOn === "to"
                  ? setTo((prevState) => prevState.concat("0"))
                  : null;
              }}
            >
              <Text className="font-futura text-[30px]">0</Text>
            </BaseButton>
            <BaseButton
              className="bg-quaternary2 h-full w-[32.6%] items-center justify-center"
              onPress={() => {
                focusOn === "from"
                  ? setFrom((prevState) => prevState.slice(0, -1))
                  : focusOn === "to"
                  ? setTo((prevState) => prevState.slice(0, -1))
                  : null;
              }}
              onLongPress={() => {
                focusOn === "from"
                  ? setFrom("")
                  : focusOn === "to"
                  ? setTo("")
                  : null;
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-7 h-7 text-black"
              >
                <Path
                  fill-rule="evenodd"
                  d="M7.22 3.22A.75.75 0 017.75 3h9A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17h-9a.75.75 0 01-.53-.22L.97 10.53a.75.75 0 010-1.06l6.25-6.25zm3.06 4a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94l-1.72-1.72z"
                  clip-rule="evenodd"
                />
              </Svg>
            </BaseButton>
          </View>
        </View>
      </View>
    </View>
  );
}
