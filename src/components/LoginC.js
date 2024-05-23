import { useState } from "react"

export default function LoginC() {
    const user = {
        userName: "Çağatay",
        password: 1234
    }

    const { userName, password } = user
    const [name, setName] = useState(null)
    const [sifre, setSifre] = useState(null)
    const login = () => {
        if (Number(sifre) === password && name === userName) {
            document.cookie = 'is_logged_in=true'
            alert("başarılı")
            document.location.href = '/'
        }
        else {
            alert("Hatalı Giriş")
        }

    }
    const logout = () => {
        document.cookie = 'is_logged_in=false'
        document.location.href = '/'
    }

    return (
        <div className="login_general">
            {window.getCookie('is_logged_in') == 'false' || window.getCookie('is_logged_in') == undefined ? (
                <form className="login" onSubmit={login}>
                    <div className="login_name">
                        <label >Kullanıcı Adı:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="login_password">
                        <label >Şifre:</label>
                        <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} />
                    </div>
                    <button className="login_button" type="submit">Giriş yap</button>
                </form>
            ) : (
                <form>
                    <button type="button" onClick={logout}>Çıkış yap</button>
                </form>
            )}

        </div>

    )
}