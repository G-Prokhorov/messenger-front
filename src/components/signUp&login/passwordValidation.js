export function changeErr(name, text, state, setErr)  {
    setErr((prev) => {
        return {
            ...prev,
            [name]: {
                text: text,
                show: state,
            },
        }
    });
}

export function password(data, setErr) {
    if (data.password.length < 6) {
        changeErr("err2", "must be more than 6 characters", true, setErr);
    } else if (data.password.includes("'") || data.password.includes('"') || data.password.includes("`")) {
        changeErr("err2", "cannot contain '`'", true, setErr);
    } else {
        changeErr("err2", "ok", false, setErr);
    }

}

export function confirmFunc(data, setErr) {
    if (data.password !== data.confirm) {
        changeErr("err3", "password mismatch", true, setErr);
    } else {
        changeErr("err3", "ok", false, setErr);
    }
}