"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconBrandGoogle, IconBrandTwitterFilled, IconBrandFacebookFilled } from "@tabler/icons-react";

import { login } from "@/lib/action";
import { useFormState } from "react-dom";

export default function Login() {

    const [state, formAction] = useFormState(login, undefined);
    return (
        <section className="login_section pt-120 p3-bg">
            <div className="container-fluid">
                <div className="row justify-content-between align-items-center">
                    <div className="col-6">
                        <div className="login_section__thumb d-none d-lg-block">
                            <Image className="w-100" width={720} height={900} src="/images/banner.jpg" alt="Image" />
                        </div>
                    </div> 
                    <div className="col-lg-6 col-xl-5">
                        <div className="login_section__loginarea">
                            <div className="row justify-content-start">
                                <div className="col-xxl-10">
                                    <div className="pb-10 pt-8 mb-7 mt-12 mt-lg-0 px-4 px-sm-10">
                                        <h3 className="mb-6 mb-md-8">Login</h3>
                                        {state?.error && (
                                            <div className="alert alert-danger" role="alert">
                                                {state.error}
                                            </div>
                                        )}
                                        <div className="login_section__form">
                                            <form action={formAction}>
                                                <div className="mb-5 mb-md-6">
                                                    <input className="n11-bg" name="user_id" data-name="Input 1" placeholder="Enter User ID"
                                                        type="text" id="Input" />
                                                </div>
                                                <div className="mb-5 mb-md-6">
                                                    <input className="n11-bg" name="password" data-name="Input 3" placeholder="Password"
                                                        type="password" id="Input-3" />
                                                </div>
                                                <button className="  p1-color  y1-bg px-5 py-3 mb-6 w-100" >Sign In</button>
                                            </form>
                                        </div>
                                        {/* <div className="login_section__socialmedia text-center mb-6">
                                            <span className="mb-6">Or continue with</span>
                                            <div className="login_section__social d-center gap-3">
                                                <Link href="#" className="n11-bg px-3 py-2 rounded-5"><IconBrandFacebookFilled className="ti ti-brand-facebook-filled fs-four" /></Link>
                                                <Link href="#" className="n11-bg px-3 py-2 rounded-5"><IconBrandTwitterFilled className="ti ti-brand-twitter-filled fs-four" /></Link>
                                                <Link href="#" className="n11-bg px-3 py-2 rounded-5"><IconBrandGoogle className="ti ti-brand-google fs-four fw-bold" /></Link>
                                            </div>
                                        </div> */}
                                        <Link className="d-center  y2-bg  p1-color    px-5 py-3 mb-6 w-100"  href="/create-acount"
                                        >Create Account</Link>
                                        {/* <span className="d-center  "><Link className="cmn-btn w-100 g2-color" href="/create-acount">Sign Up Now</Link></span> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
