import style from "../styles/alterar.module.css";
import Image from "next/image";
import Link from "next/link";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { IconWithText } from "@/components/IconWithText";

import Logo from "../../public/Logo.svg";
import Pen from "../../public/pen.svg";
import Delete from "../../public/delete.svg";
import Logout from "../../public/logout.svg";
import { EditableTable } from "@/components/EditableTable";

export default function Alterar() {
  return (
    <main className={style.main}>
      <div className="flex justify-between">
        <Link href={"/"}>
          <Image src={Logo} alt="Logo"></Image>
        </Link>
        <div className="flex gap-[4.1875rem]">
          <IconWithText
            href="/alterar"
            src={Pen}
            alt="Pen"
            text="Alterar"
          ></IconWithText>
          <IconWithText
            href="/"
            src={Delete}
            alt="Delete"
            text="Excluir"
          ></IconWithText>
          <IconWithText
            href="/sair"
            src={Logout}
            alt="Logout"
            text="Sair"
          ></IconWithText>
        </div>
      </div>
      <EditableTable></EditableTable>
      <div className={style.content}>
        {/* <TableContainer overflowX={"hidden"}>
          <Table>
            <Thead>
              <Tr>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  ID
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  MP10
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  MP25
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  O3
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  CO
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  NO2
                </Th>
                <Th
                  style={{
                    color: "#FFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                >
                  SO2
                </Th>
                <Th
                  style={{
                    paddingRight: "8.875rem",
                    paddingBottom: "1rem",
                  }}
                ></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td>10</Td>
                <Td>10</Td>
                <Td>10</Td>
                <Td>10</Td>
                <Td>10</Td>
                <Td>10</Td>
                <Td>10</Td>
                <Td>
                  <Image src={Pen} alt="Alterar Amostra"></Image>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer> */}
        
      </div>
    </main>
  );
}
