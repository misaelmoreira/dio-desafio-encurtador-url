import { config } from "../config/constants";
import { Request, Response } from "express";
import shortId from "shortid";
import { URLModel } from "../database/model/URL";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    //ver se a url ja existe
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL })
    if (url) {
        res.json(url)
        return
    }
    // Criar hash pra essa url
    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;
    // salvar url no banco
    const newURL = await URLModel.create({ hash, shortURL, originURL });
    res.json(newURL);

    // retornar a url que a gente salvou
    res.json({ originURL, hash, shortURL });
  }
  public async redirect(req: Request, res: Response): Promise<void> {
    // Pegar o hash da URL
    const { hash } = req.params;

    // Encontrar a URL original pelo hash
    const url = await URLModel.findOne({ hash })
    
    // Redirencionar para o URL original a partir do que encontramos no DB
    if (url) {
        res.redirect(url.originURL);
        return
    }

    res.status(400).json({ error: "URL not found "}) 
  }
}
