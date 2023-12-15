import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Layout'
import {
    aboutUs,
    home,
    signin,
    pageNotFound,
    signup,
    price,
    privacypolicy,
    termsandconditions,
    contactus,
    forgotpassword,
    resetpassword,
    thoughts,
    subscriptionplan,
    settings,
    createthought,
    changepassword,
    editprofile,
    privacipolici,
    termandcondi,
    pageNotFound2,
    payment
} from './routingConsts'
import Home from '../pages/Homepage'
import NotFound from '../pages/NotFound'
import AboutUs from '../pages/AboutUs/AboutUs'
import Pricing from '../pages/Pricing'
import Privacypolicy from '../pages/Privacypolicy/Privacypolicy'
import Termsandconditions from '../pages/Termsandconditions/Termsandconditions'
import ContactUs from '../pages/ContactUs'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import { useSelector } from 'react-redux'
import Thoughts from '../pages/Thoughts/'
import Settings from '../pages/Settings'
import Createthought from '../pages/Createthought'
import Myaccount from '../pages/Myaccount'
import CreatethoughtInner from '../pages/Createthought/Inner'
import EditProfile from '../pages/Myaccount/Editprofile/EditProfile'
import PrivaciPolici from '../pages/Myaccount/PrivciPolici/PrivaciPolici'
import TermAndCondi from '../pages/Myaccount/TermsAndCondition/TermAndCondi'
import ChangePassword from '../pages/Myaccount/ChangePassword/ChangePassword'
import NotFound2 from '../pages/NotFound2/NotFound2'
import ErrorBoundary from '../components/ErrorBoundary'
import Protected from './Protected'
import Payment from '../pages/Payment'
import Subscriptionplan from '../pages/Subscriptionplan'

const Routing = () => {
    const { user, isLoggedIn } = useSelector((state) => state.Auth)
    // const useName = JSON.parse(localStorage.getItem('user'))
    // console.log(useName, 'userName*--*--')
    return (
        <div>
            {user ? (
                <Routes>
                    <Route path={home} element={<DashboardLayout />}>
                        <Route
                            index
                            element={
                                <>
                                    <Protected isLoggedIn={isLoggedIn}>
                                        <Dashboard />
                                    </Protected>
                                </>
                            }
                        />
                        <Route
                            path={thoughts}
                            element={
                                <>
                                    <Protected isLoggedIn={isLoggedIn}>
                                        <Thoughts />
                                    </Protected>
                                </>
                            }
                        />
                        <Route
                            path={subscriptionplan}
                            element={<Subscriptionplan />}
                        />
                        <Route path={settings} element={<Settings />} />
                        <Route
                            path={createthought}
                            element={<Createthought />}
                        />
                        <Route
                            path={`${createthought}/:ID`}
                            element={<Createthought />}
                        />
                        <Route
                            path={`${thoughts}/:thoughtId`}
                            element={<CreatethoughtInner noclass />}
                        />

                        <Route
                            path={editprofile}
                            element={
                                <Myaccount>
                                    <EditProfile />
                                </Myaccount>
                            }
                        />
                        <Route
                            path={changepassword}
                            element={
                                <Myaccount>
                                    <ChangePassword />
                                </Myaccount>
                            }
                        />
                        <Route
                            path={privacipolici}
                            element={
                                <Myaccount>
                                    <PrivaciPolici />
                                </Myaccount>
                            }
                        />
                        <Route
                            path={termandcondi}
                            element={
                                <Myaccount>
                                    <TermAndCondi />
                                </Myaccount>
                            }
                        />
                    </Route>
                    <Route
                        path={`/payment/check-payment-status`}
                        element={<Home /> }
                    />
                    {/* <Route
                        path={`/payment/check-payment-status`}
                        element={<Payment /> }
                    /> */}
                    <Route path={pageNotFound2} element={<NotFound2 />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path={home} element={<Layout />}>
                        <Route index element={<Home />} />

                        <Route path={aboutUs} element={<AboutUs />} />
                        <Route path={price} element={<Pricing />} />
                        <Route path={contactus} element={<ContactUs />} />
                        <Route
                            path={privacypolicy}
                            element={<Privacypolicy />}
                        />
                        <Route
                            path={termsandconditions}
                            element={<Termsandconditions />}
                        />
                    </Route>
                    <Route path={signup} element={<Signup />} />
                    <Route path={signin} element={<Signin />} />
                    <Route path={forgotpassword} element={<ForgotPassword />} />
                    <Route path={resetpassword} element={<ResetPassword />} />
                    <Route path={pageNotFound} element={<NotFound />} />
                </Routes>
            )}
        </div>
    )
}

export default Routing
