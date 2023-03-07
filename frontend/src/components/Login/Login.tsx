import Image from "next/image";
import Link from "next/link";
import styles from "./Login.module.css";
import btnKakao from "/public/assets/btnKakao.png";
import btnGoogle from "/public/assets/btnGoogle.png";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "../../pages/api/auth/OAuth";

export default function Login() {
  return (
    <>
      <section className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>로그인 / 회원가입</h2>
        <p className={styles.loginInfo}>
          간편하게 로그인하고 모두의 여행을 경험해보세요
        </p>
        <div className={styles.btnList}>
          <Link className={styles.link} href={KAKAO_AUTH_URL}>
            <button className={styles.kakaoBtn}>
              <Image
                src={btnKakao}
                alt="카카오 로그인"
                width={320}
                height={48}
              />
            </button>
          </Link>
          <Link className={styles.link} href={GOOGLE_AUTH_URL}>
            <button className={styles.googleBtn}>
              <Image src={btnGoogle} alt="구글 로그인" width={46} height={46} />
              <p className={styles.loginGoogle}>Google 로그인</p>
            </button>
          </Link>
        </div>
        <p className={styles.footerDesc}>
          로그인 또는 회원가입 시, 모두의 여행 이용약관 및 개인정보 정책에
          동의한 것으로 간주합니다.
        </p>
      </section>
    </>
  );
}
