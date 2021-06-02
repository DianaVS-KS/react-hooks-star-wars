import React, {useState, useEffect} from 'react';
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

const DetailsModal = ({movie}) => {
    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          position: 'absolute',
          width: 600,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        color: {
            color: 'white',
        },
        charContainer: {
            width: 100,
            paddingRight: 10,
            paddingLeft: 10,
        }
    }));
    
    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);
    
    const handleOpen = () => {
        setOpenModal(true);
    };
    
    const handleClose = () => {
        setOpenModal(false);
    };

    const [characters, setCharacters] = useState([]);
    const [done, setDone] = useState(false);

    async function getCharacters(){
        const oneCharacter = movie.characters.map((character) => axios.get(character));
        const response = await Promise.all(oneCharacter);
        const character = response.map( c => c.data);       
        setCharacters(character);
        setDone(true);
    };

    useEffect(() => {
        if(openModal){     
          getCharacters();
        }    
    },[openModal]);

    return(
        <>
        <CardActions>
                  <Button className={classes.color} size="small" 
                  onClick={handleOpen}
                  >More Details</Button>
                  <Modal
                    className={classes.modal}
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    {
                      <div className={classes.paper}>
                          <h2 id="simple-modal-title">{movie.title}</h2>
                          <h3>
                              {movie.director}
                          </h3>
                          <h4>
                              {movie.producer}
                          </h4>
                          <p id="simple-modal-description">
                              {movie.opening_crawl}
                          </p>
                          <h2>Characters</h2>
                          <Grid container spacing={3} className={classes.modal}>
                          {
                              done ?
                              characters.map((character) => <p className={classes.charContainer} key={`${movie.id}-${character.name}`}>{character.name}</p>)
                              : <p>Loading Characters</p>
                          }
                          </Grid>
                      </div>
                    }
                  </Modal>
            </CardActions>
            </>
    )
}

export default DetailsModal;