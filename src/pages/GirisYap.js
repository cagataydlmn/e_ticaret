import { useEffect, useState } from "react"

export default function GirisYap() {
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
        <>
            <div>
                {window.getCookie('is_logged_in') == 'false' || window.getCookie('is_logged_in') == undefined ? (
                    <form onSubmit={login}>
                        <label >Kullanıcı Adı</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                        <label >Şifre</label>
                        <input type="password" value={sifre} onChange={(e) => setSifre(e.target.value)} />
                        <button type="submit">Giriş yap</button>
                    </form>
                ) : (
                    <form>
                        <button type="button" onClick={logout}>Çıkış yap</button>
                    </form>
                )}
                
            </div>
        </>
    )
}