import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

export default function Dashboard() {
    return (
        <>
            <h2>
                Đây là trang Dashboard
            </h2>
            <Link
                className={styles.card}
                href="/">
                <p className={inter.className}>
                    Về trang chủ
                </p>
            </Link>
        </>
    )
}
