import {useNavigate} from "@solidjs/router";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (event: Event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement)
        formData.append("grant_type", "password");

        fetch("/api/token", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            // @ts-ignore
            body: new URLSearchParams(formData).toString()
        }).then((response) => {
            response.json().then(data => {
                if (response.ok) navigate("/panel", {replace: true});
                else alert(data.detail);
            });
        });
    };

    return (
        <div class="flex flex-col items-center justify-center w-[100dvw] h-[100dvh] gap-2 select-none">
            <div class="flex">
                <span class="text-3xl font-bold text-amber-900">Secret Santa</span>
                <span class="font-light text-amber-800">web panel</span>
            </div>
            <form class="flex flex-col bg-amber-300 px-8 py-6 gap-2 rounded-2xl shadow-inner items-center"
                  onSubmit={handleSubmit}>
                <input class="px-4 py-2 rounded-t-xl rounded-b shadow" type="text" name="username" placeholder="Login"
                       required minlength="3"/>
                <input class="px-4 py-2 rounded-b-xl rounded-t shadow" type="password" name="password"
                       placeholder="Password" required minlength="8"/>
                <input class="mt-2 px-8 py-2 bg-white w-fit rounded-xl shadow cursor-pointer text-amber-800 font-bold"
                       type="submit" value="Login"/>
            </form>
        </div>
    )
}