import { Container, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import GrayBox from "../components/GrayBox";

export default function Help() {
  return (
    <Container
      maxWidth="xl"
      sx = {{
        display:'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <GrayBox title={"Επικοινωνία"}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right" sx = {{ width: 1/4 }}>
                  Τηλέφωνο:
                </TableCell>
                <TableCell align="left">
                  +30 210 7275225
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right" sx = {{ width: 1/4 }}>
                  Email:
                </TableCell>
                <TableCell align="left">
                  test@example.com
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </GrayBox>
    </Container>
  );
}