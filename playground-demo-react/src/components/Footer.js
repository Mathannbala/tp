import React from 'react'
import "@govtechsg/sgds/css/sgds.css"
import './styles.css'

import { Button } from "@govtechsg/sgds-react/Button"
import { Dropdown } from '@govtechsg/sgds-react'
import { NavDropdown, Nav } from '@govtechsg/sgds-react/Nav'
import { DropdownButton, Navbar } from '@govtechsg/sgds-react'
import userIcon from '../img/default_user_icon.jpg'

export default function Footer(){
    console.log("Footer")
    return(
        <footer className="sgds footer">
            <section className="footer-top">
                <div className="container-fluid">
                    <div className="row footer-header">
                    <div className="col col-lg-6">
                        <div className="title">Singapore Government Design System</div>
                        <div className="description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
                        illo delectus laborum libero id ratione quibusdam tempora
                        assumenda quas, pariatur cum minus, aliquid molestiae et nisi
                        dolorem vitae molestias! Voluptate commodi aliquid iusto sequi sit
                        eligendi, quod numquam nihil consectetur eaque error earum
                        laudantium! Temporibus accusamus pariatur quod totam quia.
                        </div>
                    </div>
                    </div>
                    <div className="row footer-items">
                    <div className="col-lg-3">
                        <div className="title">Column 1</div>
                        <ul className="links">
                        <li><a href="">About Us</a></li>
                        <li><a href="">This is a super long link</a></li>
                        <li><a href="">Test</a></li>
                        <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <div className="title">Category 1</div>
                        <ul className="links">
                        <li><a href="">About Us</a></li>
                        <li><a href="">This is a super long link</a></li>
                        <li><a href="">Test</a></li>
                        <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <div className="title">Category 1</div>
                        <ul className="links">
                        <li><a href="">About Us</a></li>
                        <li><a href="">This is a super long link</a></li>
                        <li><a href="">Test</a></li>
                        <li><a href="">Test</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="row footer-contact-links">
                    <div className="col">
                        <div className="d-flex justify-content-lg-end">
                        <ul>
                            <li><a href="">Contact</a></li>
                            <li><a href="">Feedback</a></li>
                            <li>
                            <a
                                href="https:www.reach.gov.sg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                >Reach.gov.sg</a
                            >
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                <section className="footer-bottom">
                <div className="container-fluid">
                    <div className="row footer-mandatory-links">
                    <div className="col">
                        <ul>
                        <li>
                            <a
                            href="https:tech.gov.sg/report_vulnerability"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Report Vulnerability</a
                            >
                        </li>
                        <li><a href="">Privacy</a></li>
                        <li><a href="">Terms of use</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="row footer-copyrights">
                    <div className="col">
                        <div className="d-flex justify-content-lg-end">
                        © 2022 Government of Singapore. Last Updated 08 Feb 2022
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}




