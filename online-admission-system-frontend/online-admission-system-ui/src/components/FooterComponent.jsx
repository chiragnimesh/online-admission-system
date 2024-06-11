import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";

function Footer() {
  return (
  

    <div className="Foot text-center" color="light" bgColor="dark ">
      <MDBContainer className="p-4">
        <section className="">
          <MDBRow>
            <MDBCol xl="6" className="mx-auto mb-0">
              <h6 className="text-uppercase fw-bold mb-4">
                Online Admission System
              </h6>

              <p>
              © 1961-2024 Online Admission System
              </p>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

    </div>
  );
}

export default Footer;
