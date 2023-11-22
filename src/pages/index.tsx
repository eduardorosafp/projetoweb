import {useContext, FormEvent, useState} from 'react';
import Head from "next/head"
import styles from '../../styles/home.module.scss'; 

import Image from "next/image";
import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import Link from "next/link";
import {AuthContext} from '../contexts/AuthContext'
import {toast} from 'react-toastify';

import {canSSRGuest} from '../utils/canSSRGuest'


export default function Home() {
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);



  async function handleLogin(event: FormEvent ){
    event.preventDefault();

    //if(!!email || !!password){
    if(email === '' || password === ''){
      toast.warning("Preencha todos os campos")
      return;
    }

    setLoading(true);



    let data = {
    email,
    password
    }
    await signIn(data) 

    setLoading(false);
  }
  return (
   <>
   <Head>
    <title>GranPizza - Faça seu login! </title>
   </Head>
   <div className={styles.containerCenter}>
   {/* <Image src={} alt="Logo Sujeito Pizzaria"/> */}

    <div className={styles.login}>
      <form onSubmit={handleLogin}>
      <Input
      placeholder="Digite seu email"
      type="text"
      value={email}
      onChange={ (e) => setEmail(e.target.value)}
      
      />
       <Input
      placeholder="Digite sua senha"
      type="password"
      value={password}
      onChange={ (e) => setPassword(e.target.value)}
      />

      <Button
      type="submit"
      loading={loading}
      
      >
        Acessar

      </Button>

      </form>
      <Link href="/signup">
      <a className={styles.text}>Nao possui uma conta? Cadastre-se </a>
      </Link>
     

    </div>
   </div>
   </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return{
    props:{}
  }
})
