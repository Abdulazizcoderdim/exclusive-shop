import $axios from '@/http';
import { authStore } from '@/store/auth.store';
import { Inputs } from '@/type';
import { ChangeEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import MaxWidth from '../max-width';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const AdminPanel = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [selectedFile3, setSelectedFile3] = useState<File | null>(null);
  const [selectedFile4, setSelectedFile4] = useState<File | null>(null);
  const [selectedFile5, setSelectedFile5] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isLoading } = authStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  }
  function onFileChange2(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile2(event.target.files[0]);
    }
  }
  function onFileChange3(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile3(event.target.files[0]);
    }
  }
  function onFileChange4(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile4(event.target.files[0]);
    }
  }
  function onFileChange5(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile5(event.target.files[0]);
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async values => {
    console.log('Submit funksiyasi chaqirildi');

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append file if selected
      if (selectedFile) {
        formData.append('picture', selectedFile);
      }
      if (selectedFile2) {
        formData.append('picture2', selectedFile2);
      }

      if (selectedFile3) {
        formData.append('picture3', selectedFile3);
      }

      if (selectedFile4) {
        formData.append('picture4', selectedFile4);
      }

      if (selectedFile5) {
        formData.append('picture5', selectedFile5);
      }

      // Append all other form values
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'price' || key === 'ratings') {
          // For nested objects
          Object.entries(value).forEach(([subKey, subValue]) => {
            formData.append(`${key}.${subKey}`, subValue.toString());
          });
        } else if (Array.isArray(value)) {
          // For arrays
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          // For simple fields
          formData.append(key, value.toString());
        }
      });

      // Send the request
      const response = await $axios.post('/product/create-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product created successfully');
      console.log('Product created successfully:', response.data);
      reset();
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (user && (user.role === 'admin' || user.role === 'superadmin')) {
        toast.success('You have permission to access this page');
      } else {
        navigate('/');
        toast.error('You do not have permission to access this page');
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <MaxWidth className="py-20">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name">Product name</label>
            <Input
              type="text"
              id="name"
              placeholder="Product name"
              {...register('name', { required: true })}
            />
            {errors.name && (
              <span className="text-red">This field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="category">Product Category</label>
            <Input
              type="text"
              id="category"
              placeholder="Product Category"
              {...register('category', { required: true })}
            />
            {errors.category && (
              <span className="text-red">This field is required</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full space-y-2">
              <label htmlFor="currentPrice">Current price</label>
              <Input
                placeholder="Current price"
                type="number"
                id="currentPrice"
                {...register('price.currentPrice', { required: true })}
              />
              {errors.price?.currentPrice && (
                <span className="text-red">This field is required</span>
              )}
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="originalPrice">Original price</label>
              <Input
                placeholder="Original price"
                type="number"
                id="originalPrice"
                {...register('price.originalPrice', { required: true })}
              />
              {errors.price?.originalPrice && (
                <span className="text-red">This field is required</span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="value">Reyting value</label>
            <Input
              placeholder="0"
              min={0}
              max={5}
              step={0.1}
              type="number"
              id="value"
              {...register('ratings.value', { required: true, min: 0, max: 5 })}
            />
            {errors.ratings?.value && (
              <span className="text-red">Reyting value 0 to 5 number</span>
            )}
          </div>
          <div>
            <label htmlFor="count">Reytings count</label>
            <Input
              placeholder="0"
              type="number"
              id="count"
              {...register('ratings.count', { required: true })}
            />
            {errors.ratings?.count && (
              <span className="text-red">This field is required</span>
            )}
          </div>
          <div className="items-center border p-2 rounded-md">
            <div className="flex items-center gap-2">
              <label htmlFor="inStock">In Stock: </label>
              <Input
                className="w-fit"
                type="checkbox"
                id="inStock"
                {...register('inStock')}
              />
            </div>
            <div className="space-y-1 leading-none">
              <p className="text-sm">
                Is this product currently available for sale?
              </p>
              {errors.inStock && (
                <span className="text-red">This field is required</span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Description</label>
            <Textarea
              placeholder="Product description"
              id="description"
              {...register('description', { required: true })}
            />
            {errors.description && (
              <span className="text-red">Tihs field is required</span>
            )}
          </div>
          <div>
            <label htmlFor="picture">Main Picture</label>
            <Input
              type="file"
              id="picture"
              accept="image/*"
              {...register('imageUrl', {
                required: true,
                onChange: e => {
                  onFileChange(e);
                },
              })}
            />
            {errors.imageUrl && (
              <span className="text-red">Picture is required</span>
            )}
          </div>
          <div className="flex gap-5">
            <div className="w-full">
              <label htmlFor="picture2">Small picture</label>
              <Input
                type="file"
                id="picture2"
                accept="image/*"
                {...register('imageUrl2', {
                  required: true,
                  onChange: e => {
                    onFileChange2(e);
                  },
                })}
              />
              {errors.imageUrl2 && (
                <span className="text-red">Picture is required</span>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="picture3">Small picture</label>
              <Input
                type="file"
                id="picture3"
                accept="image/*"
                {...register('imageUrl3', {
                  required: true,
                  onChange: e => {
                    onFileChange3(e);
                  },
                })}
              />
              {errors.imageUrl3 && (
                <span className="text-red">Picture is required</span>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="w-full">
              <label htmlFor="picture4">Small picture</label>
              <Input
                type="file"
                id="picture4"
                accept="image/*"
                {...register('imageUrl4', {
                  required: true,
                  onChange: e => {
                    onFileChange4(e);
                  },
                })}
              />
              {errors.imageUrl4 && (
                <span className="text-red">Picture is required</span>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="picture5">Small picture</label>
              <Input
                type="file"
                id="picture5"
                accept="image/*"
                {...register('imageUrl5', {
                  required: true,
                  onChange: e => {
                    onFileChange5(e);
                  },
                })}
              />
              {errors.imageUrl5 && (
                <span className="text-red">Picture is required</span>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </MaxWidth>
  );
};

export default AdminPanel;
