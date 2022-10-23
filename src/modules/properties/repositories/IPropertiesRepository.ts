import { ICreatePropertyDTO } from "../dtos/ICreatePropertyDTO";
import { IListPropertiesDTO } from "../dtos/IListPropertiesDTO";
import { Property } from "../entities/Property";

class IPropertiesRepository {
  list: (data: IListPropertiesDTO) => Promise<Property[]>;
  update: (id: number, data: ICreatePropertyDTO) => Promise<Property>;
  findById: (id: number) => Promise<Property>;
  create: (data: ICreatePropertyDTO) => Promise<Property>;
  delete: (id: number) => Promise<void>;
}
export { IPropertiesRepository };
