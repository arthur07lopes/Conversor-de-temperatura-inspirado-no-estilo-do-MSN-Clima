const input = document.querySelector("#temperature");
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");
const result = document.querySelector("#result");
const form = document.querySelector("#converter-form");
const msnIcon = document.querySelector("#msn-icon");

function toCelsius(value, unit) {
    if (unit === "F") return (value - 32) * 5 / 9;
    if (unit === "K") return value - 273.15;
    return value;
}

function fromCelsius(value, unit) {
    if (unit === "F") return value * 9 / 5 + 32;
    if (unit === "K") return value + 273.15;
    return value;
}

function convertTemperature(event) {
    event.preventDefault();

    if (input.value.trim() === "") {
        result.textContent = "Digite uma temperatura para converter.";
        input.focus();
        return;
    }

    const value = Number(input.value);
    const celsius = toCelsius(value, fromUnit.value);

    if (!Number.isFinite(value) || celsius < -273.15 - 1e-9) {
        result.textContent = "Valor inválido: a temperatura não pode ser inferior ao zero absoluto.";
        return;
    }

    const converted = fromCelsius(celsius, toUnit.value);
    const formatted = converted.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    const unitLabel = { C: "°C", F: "°F", K: "K" };
    const original = value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
    result.textContent = `${original} ${unitLabel[fromUnit.value]} equivalem a ${formatted} ${unitLabel[toUnit.value]}.`;
}

form.addEventListener("submit", convertTemperature);
msnIcon.addEventListener("error", () => {
    msnIcon.hidden = true;
});