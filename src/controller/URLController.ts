import  {config}  from '../config/constants';
import { Request, Response } from 'express';
import shortId from 'shortid'


export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        //ver se a url ja existe
        // Criar hash pra essa url
        const { originURL } = req.body;
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        // salvar url no banco

        // retornar a url que a gente salvou
        res.json({ originURL, hash, shortURL });

    };
    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegar o hash da URL
        const { hash } = req.params;
        // Encontrar a URL original pelo hash
        const url = {
            originalURL: 'https://cloud.mongodb.com/v2/618e6839480ce119129eccf4#clusters',
            hash: 'R60cvxfrn',
            shortURL: 'http://localhost:5000/R60cvxfrn'
        }
        // Redirencionar para o URL original a partir do que encontramos no DB
        res.redirect(url.originalURL)
    }
}