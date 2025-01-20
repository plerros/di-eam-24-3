import { Box, Container, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
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
      <GrayBox title={"Συχνές ερωτήσεις"}>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h2>Τί είναι το ΝΤΑΝΤΑΔΕΣ.GOV?</h2>
                </TableCell>
                <TableCell>
                  <Box>
                    Πλάτφόρμα που συνδέει γονείς και κηδεμόνες με νταντάδες.
                  </Box>
                  <Box>
                    Οι γονέις μπορούν να:
                    <List dense={true}>
                      <ListItem>- Αναζητήσουν νταντά για το βρέφος / νήπιο τους στην περιοχή τους</ListItem>
                      <ListItem>- Κλείσουν ραντεβού γνωρημίας</ListItem>
                      <ListItem>- Συνάψουν συμφωνίες</ListItem>
                      <ListItem>- Καταθέσουν πληρωμές</ListItem>
                    </List>
                  </Box>
                  <Box>
                    Οι νταντάδες μπορούν να:
                    <List dense={true}>
                      <ListItem>- Αναρτήσουν αγγελίες</ListItem>
                      <ListItem>- Συντονίστούν με ενδιαφερόμενους</ListItem>
                      <ListItem>- Κλείσουν συμβάσεις εργασίας</ListItem>
                      <ListItem>- Πληρωθούν</ListItem>
                    </List>
                  </Box>                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h2>Γιατί δεν μπορώ να προγραμματίσω ραντεβού?</h2>
                </TableCell>
                <TableCell>
                  Ελέγξτε ότι έχετε συνδεθεί και ότι ολοκληρώσατε τα στοιχεία του προφίλ σας. Πιθανόν η νταντά να μην έχει διαθέσιμο το συγκεκριμένο χρονικό διάστημα.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h2>Δεν βρίσκω νταντά στον δήμο μου</h2>
                </TableCell>
                <TableCell>
                  Βεβαιωθείτε ότι έχετε δηλώσει σωστά τον δήμο σας ή ότι τα φίλτρα δεν είναι υπερβολικά περιοριστικά.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h2>Εξαφανίστηκε το ραντεβού / αίτημα συνεργασίας μου</h2>
                </TableCell>
                <TableCell>
                  Οι αγγελίες ενδέχεται να ολοκληρωθούν με συνφωνία ή να διαγραφούν. Σε αυτές τις περιπτώσεις τα ραντεβού και αιτήματα ακυρώνονται.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h2>Ξέχασα τον κωδικό μου. Πώς κάνω επαναφορά?</h2>
                </TableCell>
                <TableCell>
                  Στη σελίδα σύνδεσης, κάντε κλικ στο “Ξέχασα τον κωδικό;” και ακολουθήστε τη διαδικασία μέσω email.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </GrayBox>
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
                  support@ntantades.gov.gr
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </GrayBox>
    </Container>
  );
}